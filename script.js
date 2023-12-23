// Variables
let brightness = "100", saturation = "100", inversion = "0", grayscale = "0";
let rotate = 0, flipHorizontal = 1, flipVertical = 1;
// Filters Button
const filterOptions = document.querySelectorAll(".filter button"),
// Rotate Button
rotateOptions = document.querySelectorAll(".rotate button"),
// Controls Button
// Filters Name and value
filterName = document.querySelector(".filter-info .name"),
filterValue = document.querySelector(".filter-info .value"),
// Reset options
resetFilterBtn = document.querySelector(".reset-filter"),
// Preview image
previewImg = document.querySelector(".preview-img img"),
// File input to choose image
fileInput = document.querySelector(".file-input"),
chooseImgBtn = document.querySelector(".choose-img"),
// range input
filterSlider = document.querySelector(".slider input"),
// Save Image
saveImgBtn = document.querySelector(".save-img");
// //////////////////////////////////////////////////////////////////////////////////////////

// ///////////////////////////////////////////Functions//////////////////////////////////////

// Apply Filter and Rotate
const applyFilter = () => {
    previewImg.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`;
    previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
}
//////////////////////// Choose Image
chooseImgBtn.addEventListener("click", () => fileInput.click());
/////////////////////// Load Image 
const loadImage = () => {
    let file = fileInput.files[0];
    if(!file) return;
    previewImg.src = URL.createObjectURL(file);
    previewImg.addEventListener("load", () => {
        resetFilterBtn.click();
        document.querySelector(".container").classList.remove("disable");
    });
}
//////////////////// Filter Options
filterOptions.forEach(option => {
    option.addEventListener("click", () => {
        document.querySelector(".active").classList.remove("active");
        option.classList.add("active");
        // option.addEventListener('mouseover', function handleMouseOver() {
        //     option.style.color = 'red';
        //   });
          
        //   // 👇️ Change text color back on mouseout
        //   option.addEventListener('mouseout', function handleMouseOut() {
        //     option.style.color = 'black';
        //   });
        filterName.innerText = option.innerText;
        if(option.id === "brightness") {
            filterSlider.max = "200";
            filterSlider.value = brightness;
            filterValue.innerText = `${brightness}%`;
        } else if(option.id === "saturation") {
            filterSlider.max = "200";
            filterSlider.value = saturation;
            filterValue.innerText = `${saturation}%`
        } else if(option.id === "inversion") {
            filterSlider.max = "100";
            filterSlider.value = inversion;
            filterValue.innerText = `${inversion}%`;
        } else {
            filterSlider.max = "100";
            filterSlider.value = grayscale;
            filterValue.innerText = `${grayscale}%`;
        }
    });
});
const updateFilter = () => {
    filterValue.innerText = `${filterSlider.value}%`;
    const selectedFilter = document.querySelector(".filter .active");

    if(selectedFilter.id === "brightness") {
        brightness = filterSlider.value;
    } else if(selectedFilter.id === "saturation") {
        saturation = filterSlider.value;
    } else if(selectedFilter.id === "inversion") {
        inversion = filterSlider.value;
    } else {
        grayscale = filterSlider.value;
    }
    applyFilter();
}
// ///////////////////Rotate
rotateOptions.forEach(option => {
    option.addEventListener("click", () => {
        if(option.id === "left") {
            rotate -= 90;
        } else if(option.id === "right") {
            rotate += 90;
        } else if(option.id === "horizontal") {
            flipHorizontal = flipHorizontal === 1 ? -1 : 1;
        } else {
            flipVertical = flipVertical === 1 ? -1 : 1;
        }
        applyFilter();
    });
});
const saveImage = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = previewImg.naturalWidth;
    canvas.height = previewImg.naturalHeight;
    
    ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    if(rotate !== 0) {
        ctx.rotate(rotate * Math.PI / 180);
    }
    ctx.scale(flipHorizontal, flipVertical);
    ctx.drawImage(previewImg, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
    
    const link = document.createElement("a");
    link.download = "image.jpg";
    link.href = canvas.toDataURL();
    link.click();
}
// Reset
const resetFilter = () => {
    brightness = "100"; saturation = "100"; inversion = "0"; grayscale = "0";
    rotate = 0; flipHorizontal = 1; flipVertical = 1;
    filterOptions[0].click();
    applyFilter();
}
// 👇️ Change text color on mouseover

////////////////////////////////////////Execute Functions///////////////////////////////////
fileInput.addEventListener("change", loadImage);
filterSlider.addEventListener("input", updateFilter);
resetFilterBtn.addEventListener("click", resetFilter);
saveImgBtn.addEventListener("click", saveImage);
