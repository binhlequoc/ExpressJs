const popup = document.querySelector(".popup");
const clsPopup = document.querySelector(".popup-top>i");
const post = document.querySelector(".content-post>a");
const removePopup = (e) => {
    popup.classList.remove("isPopup");
};
document.querySelectorAll(".content-post>a").forEach((item => {
    item.addEventListener("click", () => {

        popup.classList.add("isPopup");
    });
}))

popup.addEventListener("click", removePopup);
clsPopup.addEventListener("click", removePopup);

