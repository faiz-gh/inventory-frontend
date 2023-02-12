// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, onSnapshot } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrJw3sMkveH89z6qRvlzxw2L2vwaCKEW4",
  authDomain: "monke-inventory.firebaseapp.com",
  databaseURL: "https://monke-inventory-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "monke-inventory",
  storageBucket: "monke-inventory.appspot.com",
  messagingSenderId: "281878113432",
  appId: "1:281878113432:web:1333912e11a91a4476b4ed"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Index Page
export function indexPage(){
    const totalBills = document.querySelector("#main-wrapper > div.content-body > div > div.row > div:nth-child(1) > div > div > div > div > div > h2");
    const totalAmount = document.querySelector("#main-wrapper > div.content-body > div > div.row > div:nth-child(2) > div > div > div > div > div > h2");

    onSnapshot(doc(db, "data", "stats"), (doc) => {
        totalBills.innerHTML = doc.data().totalBills;
        totalAmount.innerHTML = doc.data().totalAmount;
    });

    // Upload Image
    const form = document.getElementById("image-form");
    const image = document.getElementById("image-file");
    if (form){
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const formData = new FormData();
            formData.append("bill", image.files[0]);

            fetch("http://43.205.216.220:4200/inventoryUpload", {
            method: "POST",
            body: formData,
            });
        });
    }
}

// Bills Page
export async function billsPage(){
    const tableBody = document.querySelector("#example4 > tbody");
    if(document.querySelector("#example4 > tbody > tr.odd")){
        document.querySelector("#example4 > tbody > tr.odd").remove();
    }

    const querySnapshot = await getDocs(collection(db, "bills"));

    querySnapshot.forEach((doc) => {
        var docId = doc.id;
        var invoiceId = doc.data().invoice_id;
        var invoiceDate = doc.data().invoice_date;
        var vendorName = doc.data().vendor_name;
        var vendorPhone = doc.data().vendor_phone;
        var invoiceTotal = doc.data().total;
        if (tableBody){
            tableBody.innerHTML += `
                <td>${invoiceId}</td>
                <td>${vendorName}</td>
                <td>${invoiceDate}</td>
                <td>${vendorPhone}</td>
                <td>${invoiceTotal}</td>
                <td>
                <button onclick="alert('Show Details feature is under development!')" type="button" class="btn btn-rounded btn-secondary">
                        <span class="btn-icon-left text-secondary">
                            <i class="fa fa-eye color-secondary"></i>
                        </span>
                    </button>
                </td>
            `;
        }
    });
}

// Bill Details Page
export function billDetailsPage(){
    console.log("Bill Details Page Loaded");
}
