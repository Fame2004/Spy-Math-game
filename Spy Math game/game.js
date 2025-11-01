// 1. รอให้หน้าเว็บโหลดเสร็จก่อน
document.addEventListener("DOMContentLoaded", function() {

    // 2. ดึง element ที่ต้องใช้จาก HTML
    const modeText = document.getElementById("mode-text");
    const timerDisplay = document.getElementById("timer-display");
    const scoreDisplay = document.getElementById("score-display");
    
    const problemNum1 = document.getElementById("problem-num1");
    const problemNum2 = document.getElementById("problem-num2");
    const problemOperator = document.getElementById("problem-operator");
    
    const answerButtons = document.querySelectorAll(".answer-button");

    // 3. ตัวแปรสำหรับสถานะเกม
    let score = 0;
    let timeLeft = 120; // 120 วินาที (2 นาที)
    let timerInterval;
    let currentMode = ""; // 'add' หรือ 'subtract'
    let correctAnswer = 0;

    // 4. ฟังก์ชันเริ่มเกม
    function startGame() {
        // ดึง mode จาก URL (เช่น ?mode=add)
        const urlParams = new URLSearchParams(window.location.search);
        currentMode = urlParams.get('mode');

        if (currentMode === 'add') {
            modeText.textContent = "โหมดการบวก";
            problemOperator.textContent = "+";
        } else if (currentMode === 'subtract') {
            modeText.textContent = "โหมดการลบ";
            problemOperator.textContent = "-";
        } else {
            modeText.textContent = "ผิดพลาด";
            return; // หยุดถ้าไม่รู้โหมด
        }

        score = 0;
        scoreDisplay.textContent = score;
        startTimer();
        generateProblem();
    }

    // 5. ฟังก์ชันเริ่มนับเวลา
    function startTimer() {
        timerInterval = setInterval(function() {
            timeLeft--;
            const minutes = Math.floor(timeLeft / 60);
            let seconds = timeLeft % 60;
            seconds = seconds < 10 ? '0' + seconds : seconds; // ทำให้เป็น 09, 08

            timerDisplay.textContent = `${minutes}:${seconds}`;

            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                alert(`เวลาหมด! คุณได้ ${score} คะแนน`);
                // กลับไปหน้าเลือกโหมด
                window.location.href = "select-mode.html";
            }
        }, 1000); // ทำงานทุก 1 วินาที
    }

    // 6. ฟังก์ชันสร้างโจทย์ใหม่
    function generateProblem() {
        let num1 = Math.floor(Math.random() * 10) + 1; // สุ่มเลข 1-10
        let num2 = Math.floor(Math.random() * 10) + 1;

        // ตรรกะสำหรับโหมดลบ (ป้องกันคำตอบติดลบ)
        if (currentMode === 'subtract') {
            if (num1 < num2) {
                // ถ้าตัวแรกน้อยกว่า ให้สลับที่กัน
                [num1, num2] = [num2, num1]; 
            }
            correctAnswer = num1 - num2;
        } else {
            // โหมดบวก
            correctAnswer = num1 + num2;
        }

        // แสดงโจทย์บนหน้าจอ
        problemNum1.textContent = num1;
        problemNum2.textContent = num2;

        // สร้างตัวเลือกคำตอบ (1 ถูก, 3 ผิด)
        let answers = [correctAnswer];
        while (answers.length < 4) {
            let fakeAnswer = correctAnswer + (Math.floor(Math.random() * 5) - 2); // สุ่มเลขใกล้ๆ
            if (fakeAnswer < 0) fakeAnswer = 0; // กันคำตอบหลอกติดลบ
            if (answers.indexOf(fakeAnswer) === -1) { // กันคำตอบซ้ำ
                answers.push(fakeAnswer);
            }
        }

        // สลับตำแหน่งคำตอบ
        answers = shuffleArray(answers);

        // แสดงคำตอบบนปุ่ม
        answerButtons.forEach((button, index) => {
            button.textContent = answers[index];
        });
    }

    // 7. ฟังก์ชันสุ่ม array (สำหรับสลับปุ่มคำตอบ)
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // 8. ฟังก์ชันเมื่อผู้ใช้คลิกปุ่มคำตอบ
    function checkAnswer(event) {
        const clickedButton = event.target;
        const clickedAnswer = parseInt(clickedButton.textContent);

        if (clickedAnswer === correctAnswer) {
            // ตอบถูก
            score++;
            scoreDisplay.textContent = score;
        } else {
            // ตอบผิด (อาจจะเพิ่มเสียง หรือ visual effect ทีหลัง)
            // ตอนนี้แค่ข้ามไปข้อใหม่
        }
        
        // สร้างโจทย์ใหม่ทันที
        generateProblem();
    }

    // 9. ผูก Event Listener ให้ปุ่มคำตอบทุกปุ่ม
    answerButtons.forEach(button => {
        button.addEventListener("click", checkAnswer);
    });

    // 10. เริ่มเกม!
    startGame();
});