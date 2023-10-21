const myForm = document.getElementById('myForm')        // mengambil element form
const myInput = document.querySelectorAll('input')      // mengambil semua element input
const mySelect = document.querySelectorAll('select')        // mengambil semua element select
let listCoupon = ["ABC123", "DEF456", "GHI789", "JKL012", "MNO345"]     // list kupon

// fungsi untuk mengecek apakah inputan kosong atau tidak
function required(value){
    if (value.trim() !== ''){       // trim() untuk menghapus spasi di awal dan akhir string
        return true
    }
    return false
}

// fungsi untuk mengecek apakah inputan sudah mencapai digit yang ditentukan
function maxDigit(value, digit){
    if (value.length === digit){        // length untuk menghitung panjang string
        return true
    }
    return false
}

// fungsi untuk mengecek apakah inputan kurrang dari digit yang ditentukan
function minDigit(value, digit){
    if (value.length >= digit){        
        return true
    }
    return false
}

// fungsi untuk mengecek apakah inputan nama sudah sesuai dengan ketentuan
function checkName(){
    let name = myForm.name
    let isValid = false
    let input = name.value
    let digit = minDigit(input, 3)
    let message = name.nextElementSibling
    let pattern = /^[a-zA-Z\s]+$/.test(input)       // regex untuk mengecek mengandung alfabet atau tidak
    if (required(input)){
        if (pattern && digit){              // jika inputan mengandung alfabet dan lebih dari 3 huruf, maka valid
            name.style.borderColor = '#ccc'
            message.innerText = ''
            isValid = true
        } else{
            message.innerText = 'Nama harus berupa huruf dan minimal 3 huruf'
            name.style.borderColor = 'red'
        }
    } else{
        message.innerText = "nama harus diisi"
        name.style.borderColor = 'red'
    }
    return isValid
}

// fungsi untuk mengecek apakah inputan email sudah sesuai dengan ketentuan
function checkEmail() {
    let email = myForm.email;
    let input = email.value;
    let isValid = false;
    let message = email.nextElementSibling;
    let listsDomain = ['gmail.com', 'yahoo.com', 'hotmail.com', 'yahoo.co.id', 'gmail.co.id', 'hotmail.co.id'];     // list domain yang diperbolehkan
    let pemisah = input.split('@');     // split untuk memisahkan string berdasarkan @
    if (required(input)) {
      if (listsDomain.indexOf(pemisah[1]) === -1) {  // mengecek apakah array pemisah[1] tidak ada di dalam list domain, jika benar maka tidak valid
        message.innerText = 'Email harus diakhiri dengan @gmail.com, @yahoo.com, @hotmail.com, @yahoo.co.id, @gmail.co.id, @hotmail.co.id';
        email.style.borderColor = 'red'
        return isValid = false
    } else {                //jika array pemisah[1] ada di dalam list domain, maka valid
        message.innerText = '';
        email.style.borderColor = '#ccc'
        return isValid = true
      }
    } else {
      message.innerText = 'Email harus diisi';
        email.style.borderColor = 'red'
    }
    return isValid
}


// fungsi untuk mengecek apakah inputan nomor telepon sudah sesuai dengan ketentuan
function checkPhone() {
    let phone = myForm.phone;
    let message = phone.nextElementSibling;
    let isValid = false;
    let value = phone.value;
    let number = /[0-9]\b/.test(value);     // regex untuk mengecek mengandung angka atau tidak
    let digit = maxDigit(value, 12);        // mengecek apakah inputan sudah mencapai 12 digit atau belum
    let pemisah = value.split('');          // split untuk memisahkan string berdasarkan ''
    if (required(value)) {
        if (pemisah[0] === '0' && pemisah[1] === '8' && digit && number) {      //mengecek arrray pemisah[0] dan pemisah[1] adalah 0 dan 8, dan digit sudah mencapai 12, dan mengandung angka, jika benar maka valid
            message.innerText = '';
            phone.style.borderColor = '#ccc'
            isValid = true
        } else {                // jika salah maka tidak valid
            message.innerText = 'Nomor telepon harus diawali dengan 08 dan berjumlah 12 digit';
            phone.style.borderColor = 'red'
        }
    } else {
        message.innerText = 'Nomor telepon harus diisi';
        phone.style.borderColor = 'red'
    }
    return isValid
}


// fungsi untuk mengecek apakah inputan jenis kelamin sudah dicentang atau belum
let male = document.getElementById('male')         
let female = document.getElementById('female')
function checkGender() {
    let inputUser = male.checked || female.checked;         // mengecek apakah salah satu dari gender sudah di centang
    let grandpa = male.parentElement.parentElement;          // mengambil kakek dari male
    let message = grandpa.nextElementSibling;
    let isValid = false
    if (!inputUser) {           // jika tidak ada yang di centang maka tidak valid
        message.innerText = 'Silahkan pilih salah satu jenis kelamin';
        grandpa.style.borderColor = 'red'
    } else {
        message.innerText = '';
        grandpa.style.borderColor = '#ccc'
        isValid = true
    }
    return isValid
}


// fungsi untuk mengecek apakah inputan alamat sudah sesuai dengan ketentuan
function checkAddress(){
    let address = myForm.address;
    let input = address.value;
    let pattern = /^[A-Za-z0-9\s,:;./]+$/.test(input);          // regex untuk mengecek mengandung alfabet, angka, dan simbol terntentu (,:;./)atau tidak
    let isValid = false;
    let message = address.nextElementSibling;
    if (required(input)){
        if (pattern){                   // jika mengandung alfabet, angka, dan simbol tertentu dalam pattern maka valid
            address.style.borderColor = '#ccc';
            message.innerText = '';
            isValid = true;
        } else{
            address.style.borderColor = 'red';
            message.innerText = 'Alamat tidak boleh mengandung simbol';
        }
    } else{
        address.style.borderColor = 'red';
        message.innerText = 'Alamat harus diisi';
    }
    return isValid;
}


// fungsi untuk mengecek apakah inputan tanggal kebrangkatan sudah sesuai dengan ketentuan
function checkDate() {
    let date = myForm.date;
    let message = date.nextElementSibling;
    let input = date.value;
    let hari_ini = new Date(); // Mengambil tanggal hari ini
    let tulat = new Date(hari_ini.setDate(hari_ini.getDate() + 3)); // Mengambil tanggal hari ini ditambah 3 hari
    let inputDate = new Date(input); // Mengambil tanggal inputan user
    let isValid = false;

    if (required(input)) {
        if (inputDate > tulat) { // Jika inputan user lebih besar dari tanggal hari ini ditambah 3 hari maka valid
            message.innerText = '';
            date.style.borderColor = '#ccc';
            isValid = true;
        } else { // Jika tidak maka tidak valid
            message.innerText = 'Tanggal keberangkatan minimal H+3 dari hari ini';
            date.style.borderColor = 'red';
        }
    } else {
        message.innerText = 'Tanggal keberangkatan harus diisi';
        date.style.borderColor = 'red';
    }
    return isValid;
}



// fungsi untuk mengecek apakah inputan kupon sudah sesuai dengan ketentuan
function checkCoupons(){
    let kupon = myForm.coupon;
    let input = kupon.value;
    let pattern = /^[a-zA-Z0-9]+$/.test(input);     // regex untuk mengecek mengandung alfabet dan angka atau tidak
    let isValid = true;
    let digit = maxDigit(input, 6);
    let message = kupon.nextElementSibling;
    if (required(input)){
        if (!pattern){
            message.innerText = 'inputan harus berupa alpanumeric';
            isValid = false;
        } else if(!digit){
            message.innerText = 'Kupon tidak boleh lebih dari 6 Digit';
            isValid = false;
        } else if (listCoupon.includes(input)){     // jika inputan user ada di dalam list kupon maka valid
            message.innerText = '';
        } else{
            message.innerText = 'kupon tidak sesuai';
            isValid = false;
        }       
    } else{
        message.innerText = "masukkan kupon jika anda memiliki, jika tidak abaikan";
    }
    return isValid;
}


// fungsi untuk mengecek apakah inputan transportasi sudah dipilih atau belum, untuk keberangkatan
function checkTransport() {
    let transport = myForm.transportation;;
    let message = transport.nextElementSibling;
    let input = transport.value;
    let isValid = false
    if (required(input)) {
        message.innerText = '';
        transport.style.borderColor = '#ccc'
        isValid = true
    } else {
        message.innerText = 'Pilih transportasi yang akan digunakan untuk berangkat';
        transport.style.borderColor = 'red'
    }
    return isValid
}

// fungsi untuk mengecek apakah inputan transportasi sudah dipilih atau belum, untuk pulang
function checkTransportasi() {
    let transport = myForm.transportasi;
    let message = transport.nextElementSibling;
    let input = transport.value;
    let isValid = false
    if (required(input)) {
        message.innerText = '';
        transport.style.borderColor = '#ccc'
        isValid = true
    } else {
        message.innerText = 'Pilih transportasi yang akan digunakan untuk pulang';
        transport.style.borderColor = 'red'
    }
    return isValid
}



// fungsi untuk mengecek apakah inputan destinasi sudah dipilih atau belum
function checkDestination() {
    let destination = myForm.destination;
    let message = destination.nextElementSibling;
    let input = destination.value;
    let isValid = false
    if (required(input)) {
        message.innerText = '';
        destination.style.borderColor = '#ccc'
        isValid = true
    } else {
        message.innerText = 'Pilih kota wisata yang akan dituju';
        destination.style.borderColor = 'red'
    }
    return isValid
}



// add event listener untuk semua elemen input
document.getElementById('male').addEventListener('change', checkGender)        // addEventListener untuk menambahkan event pada elemen
document.getElementById('female').addEventListener('change', checkGender)
document.getElementById('destination').addEventListener('change', checkDestination)
document.getElementById('date').addEventListener('change', checkDate)
document.getElementById('transportation').addEventListener('change', checkTransport)
document.getElementById('transportasi').addEventListener('change', checkTransportasi)

document.getElementById('name').addEventListener('keyup', checkName)
document.getElementById('email').addEventListener('keyup', checkEmail)
document.getElementById('phone').addEventListener('keyup', checkPhone)
document.getElementById('address').addEventListener('keyup', checkAddress)
document.getElementById('coupon').addEventListener('keyup', checkCoupons)


// add event listener untuk submit form
myForm.addEventListener('submit', function(e) {        // submit untuk mengecek apakah form telah di submit atau belum
    e.preventDefault();         // preventDefault() untuk mencegah aksi default dari elemen
    // memanggil semua fungsi validasi dalam variabel
    let checkname = checkName()
    let checkemail = checkEmail()
    let checkphone = checkPhone()
    let checkgender = checkGender()
    let checkaddress = checkAddress()
    let checkdate = checkDate()
    let checkcoupons = checkCoupons()
    let checktransport = checkTransport()
    let checktransportasi = checkTransportasi()
    let checkdestination = checkDestination()

    // is_valid untuk menampung nilai dari semua fungsi validasi
    is_valid = checktransportasi && checkdate && checkaddress && checktransport && checkgender && checkdestination && checkcoupons && checkphone && checkname && checkemail
    if (is_valid){      // jika semua fungsi validasi bernilai true maka akan diarahkan ke halaman succes.html
        window.location.href = 'succes.html'
    } else{         // jika salah satu fungsi validasi bernilai false maka akan return false
        return false
    }
});