# ขั้นตอนที่ 1: Build stage
FROM node:18-alpine AS builder

# ตั้ง working directory
WORKDIR /app

# คัดลอก package.json และ yarn.lock
COPY package.json yarn.lock ./

# ติดตั้ง dependencies
RUN yarn install

# คัดลอกไฟล์ทั้งหมด และ build React app
COPY . .
RUN yarn build

# ขั้นตอนที่ 2: Nginx stage
FROM nginx:stable-alpine

# คัดลอกไฟล์ build จาก stage แรกไปที่ Nginx folder
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf.template

# คัดลอกไฟล์ config Nginx (ถ้ามี) - ใช้ได้เมื่อมีการตั้งค่าเพิ่มเติม
# COPY nginx.conf /etc/nginx/nginx.conf

# เปิด port 80 สำหรับ HTTP
EXPOSE 80

# เริ่ม Nginx
CMD ["nginx", "-g", "daemon off;"]
