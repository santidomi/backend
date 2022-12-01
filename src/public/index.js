console.log("Funcionando");
// Ejecutando socket del lado del cliente.
const socketClient = io();

const form = document.getElementById("form");
const productNameInput = document.getElementById("productNameInput");
const productPriceInput = document.getElementById("productPriceInput");
const productThumbnailInput = document.getElementById("productThumbnailInput");

const addProduct = (e) => {
	e.preventDefault();
	const product = {
		name: productNameInput.value,
		thumbnail: productThumbnailInput.value,
		price: productPriceInput.value,
	};
	socketClient.emit("newProduct", product);
};
form.addEventListener("submit", addProduct);

socketClient.on("productos", (data) => {
	console.log(data);
	const productsContainer = document.getElementById("productsContainer");
	productsContainer.innerHTML = "";
	data.forEach((el) => {
		const div = document.createElement("div");
		div.classList.add("product");
		div.innerHTML = `
            <p class="productInfo">${el.name}</p>
            <p class="productInfo">$${el.price}</p>
            <div class="productImgContainer">
            <img class="productImg" src=${el.thumbnail}>
            
            </div>
            <hr class="line" />
		`;
		productsContainer.appendChild(div);
	});
});

/* Chat  part */

const chatForm = document.getElementById("chatForm");
const inputChatEmail = document.getElementById("inputChatEmail");
const inputChatText = document.getElementById("inputChatText");
console.log(chatForm);

const addMessage = (e) => {
	e.preventDefault();
	const message = {
		author: inputChatEmail.value,
		date: new Date().toLocaleString(),
		text: inputChatText.value,
	};
	socketClient.emit("newMessage", message);
	inputChatText.value = "";
	return false;
};

chatForm.addEventListener("submit", addMessage);

socketClient.on("messages", (data) => {
	console.log(data);
	const mensajes = document.getElementById("mensajes");
	mensajes.innerHTML = "";
	data.forEach((el) => {
		const div = document.createElement("div");
		div.classList.add("message");
		div.innerHTML = `
            <div class="left">
                <p class="bold">${el.author}</p>
                <p class="italic">[${el.date}] :</p>
            </div>
            <p class="text">${el.text}</p>
		`;
		mensajes.appendChild(div);
	});
});
