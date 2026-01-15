// Объект для хранения всех визуализаторов
const Visualizers = {
    
    // Вспомогательная функция для проекции 3D точки в 2D (Перспектива)
    // x, y, z - координаты, cx, cy - центр экрана
    project3D: function(x, y, z, cx, cy, fov = 300) {
        const scale = fov / (fov + z);
        return {
            x: cx + x * scale,
            y: cy + y * scale,
            scale: scale,
            visible: z > -fov // Не рисуем, если точка за камерой
        };
    },

    // --- 1. DEEP SPACE (Частицы в объеме) ---
    deepSpace: function(ctx, cx, cy, data, time) {
        // Инициализация звезд (только один раз или если массив пуст)
        if (!this.stars) {
            this.stars = Array.from({length: 400}, () => ({
                x: (Math.random() - 0.5) * 2000,
                y: (Math.random() - 0.5) * 2000,
                z: Math.random() * 2000
            }));
        }

        const bass = data[2]; // Низкие частоты для пульсации
        const speed = 5 + (bass / 10); // Скорость полета зависит от баса

        this.stars.forEach((star, i) => {
            // Движение к камере
            star.z -= speed;
            if (star.z < -200) star.z = 2000; // Респаун далеко

            // Вращение всего поля
            const angle = time * 0.2;
            const rx = star.x * Math.cos(angle) - star.z * Math.sin(angle);
            const rz = star.x * Math.sin(angle) + star.z * Math.cos(angle);

            // Проекция
            const p = this.project3D(star.x, star.y, star.z, cx, cy);

            if (p.visible) {
                const size = Math.max(0.5, p.scale * 3 * (data[i % 50] / 100));
                ctx.beginPath();
                ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${200 + (star.z/10)}, 100%, 70%, ${Math.min(1, p.scale)})`;
                ctx.fill();
            }
        });
    },

    // --- 2. QUANTUM FIELD (Волнообразная сетка) ---
    quantumField: function(ctx, cx, cy, data, time) {
        const size = 60;
        const rows = 20;
        const cols = 20;

        ctx.strokeStyle = '#00ffcc';
        ctx.lineWidth = 1;

        for (let r = 0; r < rows; r++) {
            ctx.beginPath();
            for (let c = 0; c < cols; c++) {
                // Центрирование сетки
                let x = (c - cols/2) * size;
                let y = 100; // Ниже уровня глаз
                let z = (r - rows/2) * size + 500;

                // Искажение высоты (Y) по музыке
                const freqIndex = (c + r * cols) % data.length;
                const value = data[freqIndex];
                y -= value * 1.5; // Поднимаем вершины по звуку

                // Волна по времени
                y += Math.sin(c * 0.5 + time * 2) * 20;

                const p = this.project3D(x, y, z, cx, cy);
                if (c === 0) ctx.moveTo(p.x, p.y);
                else ctx.lineTo(p.x, p.y);
            }
            ctx.stroke();
        }
    },

    // --- 3. ROMANTIC SOUL (Пульсирующее 3D сердце) ---
    romanticHeart: function(ctx, cx, cy, data, time) {
        const bass = data[5] / 255; // 0.0 to 1.0
        const scaleBase = 15 + bass * 5; 
        
        ctx.fillStyle = `rgba(0, 0, 0, 0.1)`; // След
        ctx.fillRect(0,0, cx*2, cy*2);

        // Параметрическое уравнение сердца
        for (let t = 0; t < Math.PI * 2; t += 0.05) {
            // Формула сердца
            let x = 16 * Math.pow(Math.sin(t), 3);
            let y = -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));
            let z = Math.sin(t * 5 + time) * 10; // Объем

            // Масштабируем
            x *= scaleBase;
            y *= scaleBase;

            // Вращение
            const rotSpeed = time * 0.5;
            let rx = x * Math.cos(rotSpeed) - z * Math.sin(rotSpeed);
            let rz = x * Math.sin(rotSpeed) + z * Math.cos(rotSpeed);

            const p = this.project3D(rx, y, rz + 200, cx, cy);

            ctx.beginPath();
            ctx.arc(p.x, p.y, 2 + bass * 5, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${330 + bass * 30}, 100%, 60%, 0.8)`; // Розовый -> Красный
            ctx.shadowBlur = 15;
            ctx.shadowColor = '#ff0055';
            ctx.fill();
        }
    },

    // --- 4. LOVE TUNNEL (Тоннель из сердец/колец) ---
    loveTunnel: function(ctx, cx, cy, data, time) {
        const rings = 15;
        
        for (let i = 0; i < rings; i++) {
            const zOffset = (time * 100 + i * 200) % 3000;
            const z = 3000 - zOffset; // Движение на нас
            
            const bass = data[i * 3] / 255;
            const radius = 200 + bass * 100;

            const p = this.project3D(0, 0, z, cx, cy); // Центр кольца
            
            if (p.scale > 0) {
                ctx.beginPath();
                // Рисуем кольцо (упрощенно как круг, можно заменить на форму сердца)
                ctx.arc(p.x, p.y, radius * p.scale, 0, Math.PI * 2);
                ctx.lineWidth = 5 * p.scale;
                ctx.strokeStyle = `hsla(${320 + i * 5}, 100%, 70%, ${Math.min(1, p.scale)})`;
                ctx.stroke();

                // Частицы вокруг кольца
                for(let j=0; j<8; j++) {
                    let angle = j/8 * Math.PI * 2 + time;
                    let px = Math.cos(angle) * radius;
                    let py = Math.sin(angle) * radius;
                    
                    let part = this.project3D(px, py, z, cx, cy);
                    ctx.fillStyle = '#fff';
                    ctx.beginPath();
                    ctx.arc(part.x, part.y, 3 * p.scale, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
        }
    },

    // --- 5. HYPER CUBE (Вращающийся куб в 3D) ---
    hyperCube: function(ctx, cx, cy, data, time) {
        const size = 150 + data[10] * 0.5;
        const vertices = [
            [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
            [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]
        ];

        const edges = [
            [0,1], [1,2], [2,3], [3,0], // Front face
            [4,5], [5,6], [6,7], [7,4], // Back face
            [0,4], [1,5], [2,6], [3,7]  // Connecting lines
        ];

        // Поворот по трем осям
        const angleX = time * 0.5;
        const angleY = time * 0.8;

        const projected = vertices.map(v => {
            let x = v[0] * size;
            let y = v[1] * size;
            let z = v[2] * size;

            // Вращение Y
            let x1 = x * Math.cos(angleY) - z * Math.sin(angleY);
            let z1 = x * Math.sin(angleY) + z * Math.cos(angleY);
            
            // Вращение X
            let y2 = y * Math.cos(angleX) - z1 * Math.sin(angleX);
            let z2 = y * Math.sin(angleX) + z1 * Math.cos(angleX);

            return this.project3D(x1, y2, z2 + 400, cx, cy);
        });

        ctx.strokeStyle = `hsl(${time * 50}, 100%, 50%)`;
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';

        edges.forEach(edge => {
            const p1 = projected[edge[0]];
            const p2 = projected[edge[1]];
            
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            
            // Эффект свечения, если звук громкий
            if (data[0] > 150) {
                ctx.shadowBlur = 10;
                ctx.shadowColor = ctx.strokeStyle;
            } else {
                ctx.shadowBlur = 0;
            }
            ctx.stroke();
        });
    }
};
