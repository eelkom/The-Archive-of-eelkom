const list = document.querySelector(".picker-list");
const items = list.querySelectorAll("li");
const picker = document.querySelector(".picker");

picker.addEventListener("scroll", () => {
  const pickerRect = picker.getBoundingClientRect();
  const pickerCenter = pickerRect.top + pickerRect.height / 2;

  items.forEach((item) => {
    const rect = item.getBoundingClientRect();
    const itemCenter = rect.top + rect.height / 2;
    const distance = Math.abs(pickerCenter - itemCenter);

    item.classList.toggle("active", distance < 30);
  });
});
