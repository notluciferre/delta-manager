
const thermalSwitch = document.getElementById("thermal");

thermalSwitch.addEventListener("change", function (){
    if (thermalSwitch.checked) {
        console.log("memek")
    } else {
        console.log("memek1")
    }
c});

document.addEventListener("DOMContentLoaded", () => {
  const batteryBtn = document.querySelector(".homepage-batterymode");
  const performanceBtn = document.querySelector(".homepage-performancemode");

  batteryBtn.addEventListener("click", () => {
    batteryBtn.classList.add("active");
    performanceBtn.classList.remove("active");
  });

  performanceBtn.addEventListener("click", () => {
    performanceBtn.classList.add("active");
    batteryBtn.classList.remove("active");
  });
});
