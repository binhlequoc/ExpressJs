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


const addImage = document.querySelector(".new-photo-button>input");

addImage.addEventListener("change", () => {
    const label=document.querySelector(".new-photo-button>label");
    const i=document.querySelector(".new-photo-button>label>i");
    if(i)
        label.removeChild(i);
    const img=document.querySelector(".new-photo-button>label>img");
    img.style.display='block';
    var fReader = new FileReader();
    fReader.readAsDataURL(addImage.files[0]);
    fReader.onloadend = function (event) {
      img.src = event.target.result;
    };
    

    console.log(i);
})


