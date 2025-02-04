### AuthRoute.js

1. **GET /me**
   - **Deskripsi**: Mendapatkan informasi pengguna yang sedang login.
   - **Headers**:
     - `Cookie`: Session ID
   - **Response**:
     - `200 OK`: Mengembalikan data pengguna.
     - `401 Unauthorized`: Jika pengguna belum login.

2. **POST /login**
   - **Deskripsi**: Login ke sistem.
   - **Body**:
     ```json
     {
       "email": "user@example.com",
       "password": "password123"
     }
     ```
   - **Response**:
     - `200 OK`: Login berhasil, mengembalikan data pengguna.
     - `400 Bad Request`: Jika ada field yang kosong atau kredensial tidak cocok.

3. **DELETE /logout**
   - **Deskripsi**: Logout dari sistem.
   - **Headers**:
     - `Cookie`: Session ID
   - **Response**:
     - `200 OK`: Logout berhasil.
     - `400 Bad Request`: Jika terjadi kesalahan saat logout.

### UserRoute.js

1. **GET /users**
   - **Deskripsi**: Mendapatkan daftar semua pengguna (hanya untuk admin).
   - **Headers**:
     - `Cookie`: Session ID
   - **Response**:
     - `200 OK`: Mengembalikan daftar pengguna.
     - `403 Forbidden`: Jika bukan admin.

2. **GET /users/:id**
   - **Deskripsi**: Mendapatkan detail pengguna berdasarkan ID (hanya untuk admin).
   - **Headers**:
     - `Cookie`: Session ID
   - **Response**:
     - `200 OK`: Mengembalikan data pengguna.
     - `403 Forbidden`: Jika bukan admin.

3. **POST /users**
   - **Deskripsi**: Menambahkan pengguna baru (hanya untuk admin).
   - **Body**:
     ```json
     {
       "name": "John Doe",
       "email": "john@example.com",
       "password": "password123",
       "confirmPassword": "password123",
       "role": "user"
     }
     ```
   - **Response**:
     - `201 Created`: Pengguna berhasil ditambahkan.
     - `400 Bad Request`: Jika ada field yang kosong atau password tidak cocok.

4. **PATCH /users/:id**
   - **Deskripsi**: Memperbarui data pengguna berdasarkan ID (hanya untuk admin).
   - **Body**:
     ```json
     {
       "name": "John Doe",
       "email": "john@example.com",
       "password": "newpassword123",
       "confirmPassword": "newpassword123",
       "role": "user"
     }
     ```
   - **Response**:
     - `200 OK`: Pengguna berhasil diperbarui.
     - `400 Bad Request`: Jika ada field yang kosong atau password tidak cocok.

5. **DELETE /users/:id**
   - **Deskripsi**: Menghapus pengguna berdasarkan ID (hanya untuk admin).
   - **Headers**:
     - `Cookie`: Session ID
   - **Response**:
     - `200 OK`: Pengguna berhasil dihapus.
     - `403 Forbidden`: Jika bukan admin.

### ProductRoute.js

1. **GET /products**
   - **Deskripsi**: Mendapatkan daftar semua produk.
   - **Headers**:
     - `Cookie`: Session ID
   - **Response**:
     - `200 OK`: Mengembalikan daftar produk.

2. **GET /products/:id**
   - **Deskripsi**: Mendapatkan detail produk berdasarkan ID.
   - **Headers**:
     - `Cookie`: Session ID
   - **Response**:
     - `200 OK`: Mengembalikan data produk.
     - `404 Not Found`: Jika produk tidak ditemukan.

3. **POST /products**
   - **Deskripsi**: Menambahkan produk baru.
   - **Body**:
     ```json
     {
       "name": "Product Name",
       "price": 1000
     }
     ```
   - **Response**:
     - `201 Created`: Produk berhasil ditambahkan.
     - `500 Internal Server Error`: Jika terjadi kesalahan.

4. **PATCH /products/:id**
   - **Deskripsi**: Memperbarui data produk berdasarkan ID.
   - **Body**:
     ```json
     {
       "name": "Updated Product Name",
       "price": 1500
     }
     ```
   - **Response**:
     - `200 OK`: Produk berhasil diperbarui.
     - `403 Forbidden`: Jika bukan pemilik produk.

5. **DELETE /products/:id**
   - **Deskripsi**: Menghapus produk berdasarkan ID.
   - **Headers**:
     - `Cookie`: Session ID
   - **Response**:
     - `200 OK`: Produk berhasil dihapus.
     - `403 Forbidden`: Jika bukan pemilik produk.
