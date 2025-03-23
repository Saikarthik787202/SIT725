document.getElementById("addForm").addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const num1 = document.getElementById("num1").value;
    const num2 = document.getElementById("num2").value;
  
    try {
      const response = await fetch("/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ num1, num2 }),
      });
      const result = await response.json();
      document.getElementById("result").textContent = `Result: ${result.sum}`;
    } catch (error) {
      document.getElementById("result").textContent = "Error occurred!";
    }
  });
  