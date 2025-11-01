// รอให้หน้าเว็บโหลดเสร็จก่อน
document.addEventListener("DOMContentLoaded", function() {
    
    // หาปุ่มที่เราตั้ง id ว่า "startButton"
    const startButton = document.getElementById("startButton");

    // เพิ่ม "ตัวดักฟัง" ว่าปุ่มนี้ถูกคลิกหรือยัง
    startButton.addEventListener("click", function() {
        
        // ถ้าถูกคลิก ให้ย้ายไปหน้า "select-mode.html"
        window.location.href = "select-mode.html"; 
        
    });

});