
var semuaProduk = [
  {
     gambar: "Pria/Produk1.jpg", 
     kategori: "Kaos",   ukuran: "Pria, XS-3XL",
     judul: "T-Shirt Soft Touch Kerah Bulat Lengan Panjang",  
     harga: 129, diskon: 199,  jenis: "Pria" 
    },
  {
     gambar: "Pria/Produk2.jpg", 
     kategori: "Jaket",  ukuran: "Pria, XS-3XL",
     judul: "Jaket Ritsleting DRY-EX Proteksi Sinar UV",  
     harga: 399, diskon: "-",  jenis: "Pria" 
    },
  {
     gambar: "Pria/Produk3.jpg", 
     kategori: "Kaos",   ukuran: "Pria, XS-3XL",
     judul: "UT (T-Shirt) The Super Mario Galaxy Movie",  
     harga: 199, diskon: "-",  jenis: "Pria" 
    },
  {
     gambar: "Pria/Produk4.jpg", 
     kategori: "Jaket",  ukuran: "Pria, S-XL",
     judul: "Jaket Coach Peanuts",  
     harga: 699, diskon: 899,  jenis: "Pria" 
    },
  {
     gambar: "Wanita/Produk5.jpg", 
     kategori: "Kemeja", ukuran: "Wanita, S-3XL",
     judul: "Kemeja Body Denim Lengan",  
     harga: 349, diskon: "-",  jenis: "Wanita" 
    },
  {
     gambar: "Wanita/Produk6.jpg", 
     kategori: "Kemeja", ukuran: "Wanita, S-3XL",
     judul: "Kemeja Oxford Boxy Lengan Pendek",  
     harga: 349, diskon: "-",  jenis: "Wanita" 
    },
  {
     gambar: "Wanita/Produk7.jpg", 
     kategori: "Kaos",   ukuran: "Wanita, XS-M",
     judul: "ALRISM Katun T-Shirt",  
     harga: 129, diskon: 199,  jenis: "Wanita" 
    },
  {
     gambar: "Wanita/Produk8.jpg", 
     kategori: "Jaket",  ukuran: "Wanita, M-XL",
     judul: "Jaket Aktif Ultra Stretch Ritsleting",  
     harga: 399, diskon: 499,  jenis: "Wanita" 
    },
  {
     gambar: "Anak/Produk9.jpg", 
     kategori: "Kaos",   ukuran: "Anak, 4-5Y (110cm)-14Y (160cm)",
     judul: "KIDS Alrism Katun T-Shirt Garis Kerah Bulat",  
     harga: 149, diskon: "-",  jenis: "Anak" 
    },
  {
     gambar: "Anak/Produk10.jpg", 
     kategori: "Kaos",   ukuran: "Anak, 4-5Y (110cm)-14Y (160cm)",
     judul: "KIDS Alrism Katun T-Shirt Grafis Kerah Bulat",  
     harga: 149, diskon: "-",  jenis: "Anak" 
    }
];

var keranjang = [];
var totalHarga = 0;

function renderProdukKeDalam(daftarProduk) {
  var grid = document.getElementById('productGrid');
  if (grid) {
    grid.innerHTML = ""; 
    for (var i = 0; i < daftarProduk.length; i++) {
      grid.innerHTML += buatCardProduk(daftarProduk[i]);
    }
  }
  
  var label = document.getElementById('productCountLabel');
  if (label) {
    label.innerHTML = '<h4 class="fw-bold">Hasil: ' + daftarProduk.length + ' Produk</h4>';
  }
}

function buatCardProduk(p) {
  var hargaHtml = "";
  if (p.diskon !== "-") {
    hargaHtml = '<p class="text-danger mb-0" style="font-size:16px;font-weight:bold">Rp' + p.harga + '.000</p>' +
                '<p class="text-secondary fw-bold small"><s>Rp' + p.diskon + '.000</s></p>';
  } else {
    hargaHtml = '<p class="text-dark mb-0" style="font-size:16px;font-weight:bold">Rp' + p.harga + '.000</p>';
  }

  var html = '<div class="col-md-4 col-lg-3">' +
               '<div class="card h-100 shadow-sm border-0">' +
                 '<img src="' + p.gambar + '" class="card-img-top" alt="' + p.judul + '" style="height: 250px; object-fit: cover;">' +
                 '<div class="card-body d-flex flex-column">' +
                   '<span class="badge bg-secondary mb-2" style="width: fit-content;">' + p.kategori + '</span>' +
                   '<p class="text-muted small mb-1">' + p.ukuran + '</p>' +
                   '<h6 class="fw-bold mb-2" style="font-size: 14px;">' + p.judul + '</h6>' +
                   '<div class="mt-auto">' +
                     hargaHtml +
                     '<button class="btn btn-dark btn-sm w-100 mt-3" ' +
                       'onclick="masukkanKeKeranjang(\'' + p.judul.replace(/'/g, "\\'") + '\')">' +
                       'Tambah ke Keranjang' +
                     '</button>' +
                   '</div>' +
                 '</div>' +
               '</div>' +
             '</div>';
  return html;
}


function applyFilter() {
  var pilihKategori = document.getElementById('selectKategori').value;
  var genderRadio = document.querySelector('input[name="gender"]:checked');
  var pilihGender = genderRadio ? genderRadio.value : "";
  var pilihUrutan = document.getElementById('selectUrutan').value;

  var hasil = [];
  for (var i = 0; i < semuaProduk.length; i++) {
    hasil.push(semuaProduk[i]);
  }

  if (pilihKategori !== "") {
    var hasilFilterKategori = [];
    for (var j = 0; j < hasil.length; j++) {
      if (hasil[j].kategori === pilihKategori) {
        hasilFilterKategori.push(hasil[j]);
      }
    }
    hasil = hasilFilterKategori;
  }

  if (pilihGender !== "") {
    var hasilFilterGender = [];
    for (var k = 0; k < hasil.length; k++) {
      if (hasil[k].jenis === pilihGender) {
        hasilFilterGender.push(hasil[k]);
      }
    }
    hasil = hasilFilterGender;
  }

  if (pilihUrutan !== "") {
    for (var i = 0; i < hasil.length - 1; i++) {
      for (var j = 0; j < hasil.length - i - 1; j++) {
        var perluTukar = false;
        if (pilihUrutan === "termurah") {
          perluTukar = hasil[j + 1].harga < hasil[j].harga;
        } else {
          perluTukar = hasil[j + 1].harga > hasil[j].harga;
        }
        
        if (perluTukar) {
          var temp = hasil[j];
          hasil[j] = hasil[j + 1];
          hasil[j + 1] = temp;
        }
      }
    }
  }

  renderProdukKeDalam(hasil);
}

function masukkanKeKeranjang(judulProduk) {
  var itemAda = false;

  for (var i = 0; i < keranjang.length; i++) {
    if (keranjang[i].judul === judulProduk) {
      keranjang[i].qty += 1; 
      keranjang[i].subtotal += keranjang[i].harga; 
      totalHarga += keranjang[i].harga; 
      itemAda = true;
      break;
    }
  }

  if (!itemAda) {
    for (var j = 0; j < semuaProduk.length; j++) {
      if (semuaProduk[j].judul === judulProduk) {
        var p = semuaProduk[j];
        var itemBaru = {
          gambar: p.gambar,
          kategori: p.kategori,
          ukuran: p.ukuran,
          judul: p.judul,
          harga: p.harga,
          diskon: p.diskon,
          jenis: p.jenis,
          qty: 1,
          subtotal: p.harga
        };
        keranjang.push(itemBaru);
        totalHarga += itemBaru.harga;
        break;
      }
    }
  }

  alert(judulProduk + " berhasil ditambahkan ke keranjang!");
}

function tambahQty(judul) {
  for (var i = 0; i < keranjang.length; i++) {
    if (keranjang[i].judul === judul) {
      keranjang[i].qty += 1;
      keranjang[i].subtotal += keranjang[i].harga;
      totalHarga += keranjang[i].harga;
    }
  }
  renderKeranjang();
}


function kurangQty(judul) {
  for (var i = 0; i < keranjang.length; i++) {
    if (keranjang[i].judul === judul) {
      keranjang[i].qty -= 1;
      keranjang[i].subtotal -= keranjang[i].harga;
      totalHarga -= keranjang[i].harga;
      if (keranjang[i].qty <= 0) {
        keranjang.splice(i, 1);
      }
    }
  }
  renderKeranjang();
}

function hapusItem(judul) {
  for (var i = 0; i < keranjang.length; i++) {
    if (keranjang[i].judul === judul) {
      totalHarga -= keranjang[i].subtotal;
      keranjang.splice(i, 1);
      break;
    }
  }
  renderKeranjang();
}

function clearAllCart() {
  keranjang = [];
  totalHarga = 0;
  renderKeranjang();
}

function renderKeranjang() {
  var container = document.getElementById('cartItems');
  if (!container) return;

  if (keranjang.length === 0) {
    container.innerHTML = 
      '<div class="text-center py-5">' +
        '<h4 class="fw-bold">Keranjang Kamu Kosong</h4>' +
        '<p class="text-muted mb-4">Yuk belanja dulu di halaman produk!</p>' +
        '<button class="btn btn-dark" onclick="showHomePage()">Belanja Sekarang</button>' +
      '</div>';
  } else {
    var html = "";
    for (var i = 0; i < keranjang.length; i++) {
      var item = keranjang[i];
      var subtotalTampil = formatHarga(item.subtotal);
      
      html += 
        '<div class="card mb-3 shadow-sm border-0">' +
          '<div class="row g-0 align-items-center">' +
            '<div class="col-3 col-md-2">' +
              '<img src="' + item.gambar + '" class="img-fluid rounded-start" alt="' + item.judul + '">' +
            '</div>' +
            '<div class="col-9 col-md-10">' +
              '<div class="card-body">' +
                '<div class="row align-items-center">' +
                  '<div class="col-md-5">' +
                    '<h6 class="fw-bold mb-1">' + item.judul + '</h6>' +
                    '<p class="text-muted small mb-0">' + item.ukuran + '</p>' +
                  '</div>' +
                  '<div class="col-md-3 text-center">' +
                    '<div class="d-flex align-items-center justify-content-center">' +
                      '<button class="btn btn-sm btn-outline-secondary" onclick="kurangQty(\'' + item.judul.replace(/'/g, "\\'") + '\')">-</button>' +
                      '<span class="mx-3 fw-bold">' + item.qty + '</span>' +
                      '<button class="btn btn-sm btn-outline-secondary" onclick="tambahQty(\'' + item.judul.replace(/'/g, "\\'") + '\')">+</button>' +
                    '</div>' +
                  '</div>' +
                  '<div class="col-md-4 text-end">' +
                    '<h6 class="fw-bold mb-2">Rp' + subtotalTampil + '.000</h6>' +
                    '<button class="btn btn-sm btn-link text-danger p-0" onclick="hapusItem(\'' + item.judul.replace(/'/g, "\\'") + '\')">Hapus</button>' +
                  '</div>' +
                '</div>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>';
    }
    container.innerHTML = html;
  }

  var totalText = formatHarga(totalHarga);
  document.getElementById('cartTotal').innerHTML = '<h3 class="fw-bold m-0">Total: Rp' + totalText + '.000</h3>';
}

function formatHarga(angka) {
  if (angka === 0) return "0";
  var s = angka.toString();
  var hasil = "";
  var count = 0;
  for (var i = s.length - 1; i >= 0; i--) {
    count++;
    hasil = s[i] + hasil;
    if (count % 3 === 0 && i !== 0) {
      hasil = "." + hasil;
    }
  }
  return hasil;
}

function showCartPage() {
  document.getElementById('pageHome').classList.add('hidden');
  document.getElementById('pageCart').classList.remove('hidden');
  document.getElementById('navProduk').classList.remove('fw-bold', 'text-dark');
  document.getElementById('navProduk').classList.add('text-secondary');
  document.getElementById('navCart').classList.add('fw-bold', 'text-dark');
  document.getElementById('navCart').classList.remove('text-secondary');
  renderKeranjang();
}

function showHomePage() {
  document.getElementById('pageHome').classList.remove('hidden');
  document.getElementById('pageCart').classList.add('hidden');
  document.getElementById('navProduk').classList.add('fw-bold', 'text-dark');
  document.getElementById('navProduk').classList.remove('text-secondary');
  document.getElementById('navCart').classList.remove('fw-bold', 'text-dark');
  document.getElementById('navCart').classList.add('text-secondary');
}

renderProdukKeDalam(semuaProduk);
