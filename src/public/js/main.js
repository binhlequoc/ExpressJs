const popup = document.querySelector(".popup");
const clsPopup = document.querySelector(".popup-top>i");
const post = document.querySelector(".content-post>a");
const removePopup = (e) => {
    popup.removeAttribute("id");
    document.querySelector(".carousel-inner").innerHTML = '';

};
document.querySelectorAll(".post").forEach((item => {

    item.addEventListener("click", () => {
        popup.setAttribute('id', 'isPopup');
        document.querySelector('.popup-top>h3').innerHTML = item.querySelector(".content-post>a").innerHTML;
        if (document.querySelector('.popup-content>img') != null)
            document.querySelector('.popup-content>img').src = item.querySelector(".image-post>img").getAttribute('src');
        if (document.querySelector('.carousel-inner') != null) {
            item.querySelectorAll(".image-post>img").forEach((img, index) => {
                caro = document.createElement('div');
                caro.classList.add('carousel-item');
                if (index == 0) caro.classList.add('active');
                i = document.createElement('img');
                i.classList.add('d-block');
                i.classList.add('w-100');
                i.src = img.src;
                caro.appendChild(i);

                document.querySelector('.carousel-inner').appendChild(caro);
            })
        }
        document.querySelector('.popup-content>p').innerHTML = item.querySelector(".content-post>p").innerHTML;
    });
}));

// popup.addEventListener("click", removePopup);
clsPopup.addEventListener("click", removePopup);

const addImage = document.querySelector(".new-photo-button>input");
if (addImage) {
    addImage.addEventListener("change", () => {

        const label = document.querySelector(".new-photo-button>label");

        const i = document.querySelector(".new-photo-button>label>i");
        if (i)
            label.removeChild(i);
        const img = document.querySelector(".new-photo-button>label>img");
        img.style.display = 'block';
        const closeDiv = document.createElement("div");
        closeDiv.classList.add("close");
        const ic = document.createElement("i");
        ic.classList.add("fa-solid");
        ic.classList.add("fa-xmark");
        ic.addEventListener("click", () => {

            removeImage(ic);
        });
        closeDiv.appendChild(ic);
        label.appendChild(closeDiv);
        var fReader = new FileReader();
        fReader.readAsDataURL(addImage.files[0]);
        fReader.onloadend = function (event) {
            img.src = event.target.result;
        };


        console.log(i);
    });
}


const addAlbum = document.querySelector(".new-album-button>input");

addAlbum.addEventListener("change", (event) => {

    const label = document.querySelector(".new-album-button>label");
    const wrap = document.querySelector(".new-album-button");
    const label2 = document.createElement("label");
    const img = document.createElement("img");

    const closeDiv = document.createElement("div");
    closeDiv.classList.add("close");
    const i = document.createElement("i");
    i.classList.add("fa-solid");
    i.classList.add("fa-xmark");
    i.addEventListener("click", () => {

        removeImage(i);
    });
    closeDiv.appendChild(i);
    const images = document.querySelector(".new-album-button>#images");
    const input = document.createElement("input");
    input.name = "images";
    input.type = "hidden";
    img.style.display = 'block';
    var fReader = new FileReader();
    fReader.readAsDataURL(addAlbum.files[0]);
    fReader.onloadend = function (event) {
        img.src = event.target.result;
        input.value = event.target.result;
    };
    label2.appendChild(img);
    label2.appendChild(closeDiv);
    label2.appendChild(input);
    wrap.insertBefore(label2, wrap.firstChild);



}, false);


function removeImage(event) {
    const images = document.querySelector('.new-album-button');
    images.removeChild(event.parentElement.parentElement)

}


