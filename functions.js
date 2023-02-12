// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, getDoc, doc, getCountFromServer } from "firebase/firestore";

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
export async function indexPage(){
    const totalBills = document.querySelector("#main-wrapper > div.content-body > div > div.row > div:nth-child(1) > div > div > div > div > div > h2");
    const totalAmount = document.querySelector("#main-wrapper > div.content-body > div > div.row > div:nth-child(2) > div > div > div > div > div > h2");
    if (totalBills != null && totalAmount != null){
        const coll = collection(db, "bills");
        const snapshot = await getCountFromServer(coll);
        totalBills.innerHTML = snapshot.data().count;

        var totalAmt = 0;
        const querySnapshot = await getDocs(collection(db, "bills"));
        querySnapshot.forEach((doc) => {
            var invoiceTotal = doc.data().total;
            var number = parseFloat(invoiceTotal.replace(/[^\d.]/g, ''));
            totalAmt += number;
            console.log(number);
        });
        totalAmount.innerHTML = totalAmt;
    }

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
                    <a href="bill-details.html?id=${docId}">
                        <button type="button" class="btn btn-rounded btn-secondary">
                            <span class="btn-icon-left text-secondary">
                                <i class="fa fa-eye color-secondary"></i>
                            </span>
                        </button>
                    </a>
                </td>
            `;
        }
    });
}

// Bill Details Page
export async function billDetailsPage(){
    const urlParams = new URLSearchParams(window.location.search);
    const docId = urlParams.get("id");

    const docRef = doc(db, "bills", docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const invoiceId = docSnap.data().invoice_id;
        const invoiceDate = docSnap.data().invoice_date;
        const vendorName = docSnap.data().vendor_name;
        const vendorPhone = docSnap.data().vendor_phone;
        const invoiceTotal = docSnap.data().total;
        const invoiceItems = docSnap.data().items;
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}
