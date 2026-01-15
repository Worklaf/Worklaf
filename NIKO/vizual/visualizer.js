// ===== ВИЗУАЛИЗАТОРЫ С 5D ПРОСТРАНСТВОМ =====

// Класс для 3D точки с перспективой
class Point3D {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    project(width, height, depth, perspective) {
        const scale = perspective / (perspective + this.z + depth);
        return {
            x: this.x * scale + width / 2,
            y: this.y * scale + height / 2,
            scale: scale
        };
    }

    rotateX(angle) {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        const y = this.y * cos - this.z * sin;
        const z = this.y * sin + this.z * cos;
        this.y = y;
        this.z = z;
    }

    rotateY(angle) {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        const x = this.x * cos + this.z * sin;
        const z = -this.x * sin + this.z * cos;
        this.x = x;
        this.z = z;
    }

    rotateZ(angle) {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        const x = this.x * cos - this.y * sin;
        const y = this.x * sin + this.y * cos;
        this.x = x;
        this.y = y;
    }
}

// 5D визуализаторы
export const visualizers = {
    // 1. 5D Гиперкуб
    hyperCube5D: (ctx, centerX, centerY, dataArray, state, time) => {
        const avgIntensity = dataArray.reduce((a, b) => a + b, 0) / dataArray.length / 255;
        const bassIntensity = dataArray.slice(0, 20).reduce((a, b) => a + b, 0) / 20 / 255;
        
        const size = 100 * state.vizScale;
        const depth = state.depth3D;
        const perspective = state.perspective;
        
        // Создаем вершины гиперкуба (4D проекция)
        const vertices = [];
        for (let w = -1; w <= 1; w += 2) {
            for (let z = -1; z <= 1; z += 2) {
                for (let y = -1; y <= 1; y += 2) {
                    for (let x = -1; x <= 1; x += 2) {
                        // 4D в 3D проекция с временным измерением
                        const w4d = w * Math.cos(time * state.vizSpeed * 0.5);
                        const point = new Point3D(
                            x * size * (1 + w4d * 0.3),
                            y * size * (1 + w4d * 0.3),
                            z * size * (1 + w4d * 0.3)
                        );
                        
                        // Применяем вращения
                        point.rotateX(state.rotationX * Math.PI / 180 + time * state.vizSpeed * 0.2);
                        point.rotateY(state.rotationY * Math.PI / 180 + time * state.vizSpeed * 0.3);
                        point.rotateZ(time * state.vizSpeed * 0.15);
                        
                        // Добавляем пульсацию от музыки
                        const intensity = dataArray[vertices.length % dataArray.length] / 255;
                        point.x *= (1 + intensity * 0.5);
                        point.y *= (1 + intensity * 0.5);
                        point.z *= (1 + intensity * 0.5);
                        
                        vertices.push(point);
                    }
                }
            }
        }
        
        // Проецируем и рисуем
        const projected = vertices.map(v => v.project(centerX, centerY, depth, perspective));
        
        // Рисуем связи
        ctx.strokeStyle = `hsla(${time * 50 % 360}, 100%, 60%, 0.6)`;
        ctx.lineWidth = 2;
        ctx.shadowBlur = state.vizGlow;
        ctx.shadowColor = `hsl(${time * 50 % 360}, 100%, 60%)`;
        
        for (let i = 0; i < vertices.length; i++) {
            for (let j = i + 1; j < vertices.length; j++) {
                // Проверяем, являются ли вершины соседними
                const dx = Math.abs(vertices[i].x - vertices[j].x);
                const dy = Math.abs(vertices[i].y - vertices[j].y);
                const dz = Math.abs(vertices[i].z - vertices[j].z);
                
                if ((dx < size * 2.5 && dy < 10 && dz < 10) ||
                    (dy < size * 2.5 && dx < 10 && dz < 10) ||
                    (dz < size * 2.5 && dx < 10 && dy < 10)) {
                    
                    ctx.beginPath();
                    ctx.moveTo(projected[i].x, projected[i].y);
                    ctx.lineTo(projected[j].x, projected[j].y);
                    ctx.globalAlpha = (projected[i].scale + projected[j].scale) / 2 * 0.5;
                    ctx.stroke();
                }
            }
        }
        
        // Рисуем вершины
        projected.forEach((p, i) => {
            const intensity = dataArray[i % dataArray.length] / 255;
            const radius = 4 * p.scale * (1 + intensity);
            
            ctx.beginPath();
            ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${(time * 50 + i * 10) % 360}, 100%, 70%, ${p.scale})`;
            ctx.globalAlpha = p.scale;
            ctx.fill();
        });
        
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
    },

    // 2. 5D Спиральная галактика
    spiralGalaxy5D: (ctx, centerX, centerY, dataArray, state, time) => {
        const layers = 15;
        const pointsPerLayer = 50;
        
        for (let layer = 0; layer < layers; layer++) {
            const layerDepth = (layer / layers - 0.5) * state.depth3D;
            const layerRadius = 200 * state.vizScale * (1 - layer / layers * 0.5);
            
            for (let i = 0; i < pointsPerLayer; i++) {
                const angle = (i / pointsPerLayer) * Math.PI * 2 * 3 + layer * 0.5;
                const dataIndex = Math.floor((i / pointsPerLayer) * dataArray.length);
                const intensity = dataArray[dataIndex] / 255;
                
                // 5D координаты
                const spiralFactor = 1 + Math.sin(time * state.vizSpeed + layer * 0.5) * 0.3;
                const radius = layerRadius * (0.5 + intensity * 0.5) * spiralFactor;
                
                const point = new Point3D(
                    Math.cos(angle) * radius,
                    Math.sin(angle) * radius,
                    layerDepth + Math.sin(angle * 2 + time * state.vizSpeed) * 50
                );
                
                // Дополнительные вращения
                point.rotateX(state.rotationX * Math.PI / 180 + time * state.vizSpeed * 0.1);
                point.rotateY(state.rotationY * Math.PI / 180 + time * state.vizSpeed * 0.2);
                
                const projected = point.project(centerX, centerY, 0, state.perspective);
                
                // Рисуем частицу
                const size = 3 * projected.scale * (1 + intensity);
                const hue = (angle * 50 + time * 20 + layer * 15) % 360;
                
                ctx.beginPath();
                ctx.arc(projected.x, projected.y, size, 0, Math.PI * 2);
                
                const gradient = ctx.createRadialGradient(
                    projected.x, projected.y, 0,
                    projected.x, projected.y, size
                );
                gradient.addColorStop(0, `hsla(${hue}, 100%, 70%, ${projected.scale * intensity})`);
                gradient.addColorStop(1, `hsla(${hue}, 100%, 50%, 0)`);
                
                ctx.fillStyle = gradient;
                ctx.shadowBlur = state.vizGlow * intensity;
                ctx.shadowColor = `hsl(${hue}, 100%, 60%)`;
                ctx.fill();
            }
        }
        
        ctx.shadowBlur = 0;
    },

    // 3. 5D Тор (Donut)
    torus5D: (ctx, centerX, centerY, dataArray, state, time) => {
        const majorRadius = 150 * state.vizScale;
        const minorRadius = 60 * state.vizScale;
        const segments = 40;
        const tubes = 20;
        
        const points = [];
        
        for (let i = 0; i < segments; i++) {
            const u = (i / segments) * Math.PI * 2;
            const dataIndex1 = Math.floor((i / segments) * dataArray.length);
            const intensity1 = dataArray[dataIndex1] / 255;
            
            for (let j = 0; j < tubes; j++) {
                const v = (j / tubes) * Math.PI * 2;
                const dataIndex2 = (dataIndex1 + j) % dataArray.length;
                const intensity2 = dataArray[dataIndex2] / 255;
                
                // Параметрическое уравнение тора с музыкальной деформацией
                const r = majorRadius + minorRadius * Math.cos(v) * (1 + intensity2 * 0.5);
                const x = r * Math.cos(u);
                const y = r * Math.sin(u);
                const z = minorRadius * Math.sin(v) * (1 + intensity1 * 0.5);
                
                const point = new Point3D(x, y, z);
                
                // Волновая деформация (5-е измерение)
                const wave = Math.sin(u * 3 + v * 2 + time * state.vizSpeed) * 20 * intensity1;
                point.z += wave;
                
                // Вращения
                point.rotateX(state.rotationX * Math.PI / 180 + time * state.vizSpeed * 0.3);
                point.rotateY(state.rotationY * Math.PI / 180 + time * state.vizSpeed * 0.4);
                point.rotateZ(time * state.vizSpeed * 0.2);
                
                points.push({ point, intensity: (intensity1 + intensity2) / 2, u, v });
            }
        }
        
        // Сортировка по глубине
        points.sort((a, b) => a.point.z - b.point.z);
        
        // Рисуем поверхность
        points.forEach(({ point, intensity, u, v }, idx) => {
            const projected = point.project(centerX, centerY, 0, state.perspective);
            
            if (projected.scale > 0.1) {
                const size = 4 * projected.scale * (0.5 + intensity);
                const hue = ((u + v) * 50 + time * 30) % 360;
                
                ctx.beginPath();
                ctx.arc(projected.x, projected.y, size, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${hue}, 100%, 60%, ${projected.scale * 0.8})`;
                ctx.shadowBlur = state.vizGlow * intensity * projected.scale;
                ctx.shadowColor = `hsl(${hue}, 100%, 60%)`;
                ctx.fill();
            }
        });
        
        ctx.shadowBlur = 0;
    },

    // 4. 5D Кристаллическая решетка
    crystalLattice5D: (ctx, centerX, centerY, dataArray, state, time) => {
        const gridSize = 8;
        const spacing = 60 * state.vizScale;
        const points = [];
        
        // Создаем 3D решетку
        for (let x = -gridSize; x <= gridSize; x++) {
            for (let y = -gridSize; y <= gridSize; y++) {
                for (let z = -gridSize; z <= gridSize; z++) {
                    const distance = Math.sqrt(x*x + y*y + z*z);
                    if (distance < gridSize) {
                        const dataIndex = Math.floor(distance / gridSize * dataArray.length);
                        const intensity = dataArray[dataIndex % dataArray.length] / 255;
                        
                        const point = new Point3D(
                            x * spacing,
                            y * spacing,
                            z * spacing
                        );
                        
                        // Волновая деформация
                        const wave = Math.sin(x * 0.5 + time * state.vizSpeed) * 
                                   Math.cos(y * 0.5 + time * state.vizSpeed * 0.7) * 
                                   Math.sin(z * 0.5 + time * state.vizSpeed * 0.5) * 
                                   30 * intensity;
                        
                        point.x += wave;
                        point.y += wave * 0.5;
                        point.z += wave * 0.7;
                        
                        // Вращения
                        point.rotateX(state.rotationX * Math.PI / 180 + time * state.vizSpeed * 0.1);
                        point.rotateY(state.rotationY * Math.PI / 180 + time * state.vizSpeed * 0.15);
                        point.rotateZ(time * state.vizSpeed * 0.05);
                        
                        points.push({ 
                            point, 
                            intensity, 
                            distance,
                            gridPos: {x, y, z}
                        });
                    }
                }
            }
        }
        
        // Сортировка по глубине
        points.sort((a, b) => a.point.z - b.point.z);
        
        // Рисуем связи
        ctx.lineWidth = 1;
        points.forEach((p1, i) => {
            points.slice(i + 1).forEach(p2 => {
                const dx = Math.abs(p1.gridPos.x - p2.gridPos.x);
                const dy = Math.abs(p1.gridPos.y - p2.gridPos.y);
                const dz = Math.abs(p1.gridPos.z - p2.gridPos.z);
                
                if (dx + dy + dz === 1) {
                    const proj1 = p1.point.project(centerX, centerY, 0, state.perspective);
                    const proj2 = p2.point.project(centerX, centerY, 0, state.perspective);
                    
                    const avgScale = (proj1.scale + proj2.scale) / 2;
                    const avgIntensity = (p1.intensity + p2.intensity) / 2;
                    
                    if (avgScale > 0.2) {
                        ctx.beginPath();
                        ctx.moveTo(proj1.x, proj1.y);
                        ctx.lineTo(proj2.x, proj2.y);
                        
                        const hue = (p1.distance * 30 + time * 20) % 360;
                        ctx.strokeStyle = `hsla(${hue}, 100%, 60%, ${avgScale * avgIntensity * 0.5})`;
                        ctx.stroke();
                    }
                }
            });
        });
        
        // Рисуем узлы
        points.forEach(({ point, intensity, distance }) => {
            const projected = point.project(centerX, centerY, 0, state.perspective);
            
            if (projected.scale > 0.2) {
                const size = 3 * projected.scale * (0.5 + intensity);
                const hue = (distance * 30 + time * 20) % 360;
                
                ctx.beginPath();
                ctx.arc(projected.x, projected.y, size, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${hue}, 100%, 70%, ${projected.scale})`;
                ctx.shadowBlur = state.vizGlow * intensity;
                ctx.shadowColor = `hsl(${hue}, 100%, 60%)`;
                ctx.fill();
            }
        });
        
        ctx.shadowBlur = 0;
    },

    // 5. 5D Сферический гармонический резонатор
    sphericalHarmonics5D: (ctx, centerX, centerY, dataArray, state, time) => {
        const radius = 150 * state.vizScale;
        const resolution = 30;
        const bassIntensity = dataArray.slice(0, 20).reduce((a, b) => a + b, 0) / 20 / 255;
        
        for (let i = 0; i < resolution; i++) {
            const theta = (i / resolution) * Math.PI;
            
            for (let j = 0; j < resolution * 2; j++) {
                const phi = (j / (resolution * 2)) * Math.PI * 2;
                
                const dataIndex = Math.floor((i * resolution * 2 + j) / (resolution * resolution * 2) * dataArray.length);
                const intensity = dataArray[dataIndex % dataArray.length] / 255;
                
                // Сферические гармоники Y_l^m
                const l = 3, m = 2;
                const harmonic = Math.sin(l * theta) * Math.cos(m * phi + time * state.vizSpeed);
                
                const r = radius * (1 + harmonic * 0.3 * bassIntensity + intensity * 0.3);
                
                const point = new Point3D(
                    r * Math.sin(theta) * Math.cos(phi),
                    r * Math.sin(theta) * Math.sin(phi),
                    r * Math.cos(theta)
                );
                
                // Пульсация во времени (5-е измерение)
                const timeMod = Math.sin(time * state.vizSpeed * 2 + theta * 2) * 20 * intensity;
                point.x *= (1 + timeMod * 0.01);
                point.y *= (1 + timeMod * 0.01);
                point.z *= (1 + timeMod * 0.01);
                
                // Вращения
                point.rotateX(state.rotationX * Math.PI / 180 + time * state.vizSpeed * 0.2);
                point.rotateY(state.rotationY * Math.PI / 180 + time * state.vizSpeed * 0.3);
                
                const projected = point.project(centerX, centerY, 0, state.perspective);
                
                if (projected.scale > 0.3) {
                    const size = 2 * projected.scale * (0.5 + intensity);
                    const hue = ((theta + phi) * 100 + time * 30) % 360;
                    
                    ctx.beginPath();
                    ctx.arc(projected.x, projected.y, size, 0, Math.PI * 2);
                    
                    const gradient = ctx.createRadialGradient(
                        projected.x, projected.y, 0,
                        projected.x, projected.y, size
                    );
                    gradient.addColorStop(0, `hsla(${hue}, 100%, 70%, ${projected.scale * intensity})`);
                    gradient.addColorStop(1, `hsla(${hue}, 100%, 40%, 0)`);
                    
                    ctx.fillStyle = gradient;
                    ctx.fill();
                }
            }
        }
    },

    // 6. Романтическое сердце 3D
    romanticHeart3D: (ctx, centerX, centerY, dataArray, state, time) => {
        const scale = 100 * state.vizScale;
        const points = [];
        const resolution = 50;
        
        for (let i = 0; i < resolution; i++) {
            const t = (i / resolution) * Math.PI * 2;
            const bassIndex = Math.floor(i / resolution * 20);
            const intensity = dataArray[bassIndex] / 255;
            
            // Параметрическое уравнение сердца
            const x = 16 * Math.pow(Math.sin(t), 3);
            const y = -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));
            
            // Создаем 3D эффект с глубиной
            for (let z = -5; z <= 5; z++) {
                const point = new Point3D(
                    x * scale * 0.1,
                    y * scale * 0.1,
                    z * scale * 0.3 * (1 + intensity * 0.5)
                );
                
                // Пульсация от музыки
                const pulse = 1 + Math.sin(time * state.vizSpeed * 3) * 0.2 * intensity;
                point.x *= pulse;
                point.y *= pulse;
                
                point.rotateX(state.rotationX * Math.PI / 180 + time * state.vizSpeed * 0.2);
                point.rotateY(state.rotationY * Math.PI / 180 + time * state.vizSpeed * 0.1);
                point.rotateZ(Math.sin(time * state.vizSpeed) * 0.2);
                
                points.push({ point, intensity, t, z });
            }
        }
        
        points.sort((a, b) => a.point.z - b.point.z);
        
        points.forEach(({ point, intensity, t, z }) => {
            const projected = point.project(centerX, centerY, 0, state.perspective);
            
            if (projected.scale > 0.2) {
                const size = 4 * projected.scale * (0.8 + intensity * 0.5);
                const hue = 340 + Math.sin(t + time * state.vizSpeed) * 20;
                
                ctx.beginPath();
                ctx.arc(projected.x, projected.y, size, 0, Math.PI * 2);
                
                const gradient = ctx.createRadialGradient(
                    projected.x, projected.y, 0,
                    projected.x, projected.y, size
                );
                gradient.addColorStop(0, `hsla(${hue}, 100%, 70%, ${projected.scale})`);
                gradient.addColorStop(1, `hsla(${hue}, 100%, 50%, 0)`);
                
                ctx.fillStyle = gradient;
                ctx.shadowBlur = state.vizGlow * intensity;
                ctx.shadowColor = `hsl(${hue}, 100%, 60%)`;
                ctx.fill();
            }
        });
        
        ctx.shadowBlur = 0;
    },

    // 7. ДНК спираль с частицами
    dnaHelix3D: (ctx, centerX, centerY, dataArray, state, time) => {
        const height = 300 * state.vizScale;
        const radius = 80 * state.vizScale;
        const segments = 60;
        
        for (let i = 0; i < segments; i++) {
            const t = (i / segments) * Math.PI * 4;
            const y = (i / segments - 0.5) * height;
            const dataIndex = Math.floor((i / segments) * dataArray.length);
            const intensity = dataArray[dataIndex % dataArray.length] / 255;
            
            // Первая нить
            const point1 = new Point3D(
                Math.cos(t + time * state.vizSpeed) * radius * (1 + intensity * 0.3),
                y,
                Math.sin(t + time * state.vizSpeed) * radius * (1 + intensity * 0.3)
            );
            
            // Вторая нить (противоположная)
            const point2 = new Point3D(
                Math.cos(t + Math.PI + time * state.vizSpeed) * radius * (1 + intensity * 0.3),
                y,
                Math.sin(t + Math.PI + time * state.vizSpeed) * radius * (1 + intensity * 0.3)
            );
            
            // Вращения
            point1.rotateX(state.rotationX * Math.PI / 180);
            point1.rotateY(state.rotationY * Math.PI / 180);
            point2.rotateX(state.rotationX * Math.PI / 180);
            point2.rotateY(state.rotationY * Math.PI / 180);
            
            const proj1 = point1.project(centerX, centerY, 0, state.perspective);
            const proj2 = point2.project(centerX, centerY, 0, state.perspective);
            
            // Рисуем нити
            if (proj1.scale > 0.3 && proj2.scale > 0.3) {
                const hue1 = (t * 50 + time * 20) % 360;
                const hue2 = (hue1 + 180) % 360;
                
                // Точки на нитях
                ctx.beginPath();
                ctx.arc(proj1.x, proj1.y, 4 * proj1.scale, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${hue1}, 100%, 60%, ${proj1.scale})`;
                ctx.shadowBlur = state.vizGlow * intensity;
                ctx.shadowColor = `hsl(${hue1}, 100%, 60%)`;
                ctx.fill();
                
                ctx.beginPath();
                ctx.arc(proj2.x, proj2.y, 4 * proj2.scale, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${hue2}, 100%, 60%, ${proj2.scale})`;
                ctx.shadowBlur = state.vizGlow * intensity;
                ctx.shadowColor = `hsl(${hue2}, 100%, 60%)`;
                ctx.fill();
                
                // Перемычки между нитями
                if (i % 3 === 0) {
                    ctx.beginPath();
                    ctx.moveTo(proj1.x, proj1.y);
                    ctx.lineTo(proj2.x, proj2.y);
                    ctx.strokeStyle = `hsla(${(hue1 + hue2) / 2}, 100%, 70%, ${(proj1.scale + proj2.scale) / 2 * 0.5})`;
                    ctx.lineWidth = 2;
                    ctx.stroke();
                }
            }
        }
        
        ctx.shadowBlur = 0;
    },

    // 8. Квантовые волновые функции
    quantumWaves5D: (ctx, centerX, centerY, dataArray, state, time) => {
        const layers = 10;
        const pointsPerLayer = 100;
        
        for (let layer = 0; layer < layers; layer++) {
            const layerTime = time * state.vizSpeed + layer * 0.5;
            const zOffset = (layer - layers / 2) * 50;
            
            ctx.beginPath();
            let firstPoint = true;
            
            for (let i = 0; i <= pointsPerLayer; i++) {
                const x = (i / pointsPerLayer - 0.5) * 600 * state.vizScale;
                const dataIndex = Math.floor((i / pointsPerLayer) * dataArray.length);
                const intensity = dataArray[dataIndex % dataArray.length] / 255;
                
                // Квантовая волновая функция (суперпозиция состояний)
                const y = Math.sin(x * 0.02 + layerTime) * 50 * intensity +
                         Math.cos(x * 0.03 - layerTime * 0.7) * 30 * intensity +
                         Math.sin(x * 0.01 + layerTime * 1.5) * 20;
                
                const point = new Point3D(x, y, zOffset);
                
                // Квантовая интерференция во времени
                const interference = Math.sin(x * 0.05 + time * state.vizSpeed * 2) * 
                                   Math.cos(layer * 0.5 + time * state.vizSpeed);
                point.y += interference * 15 * intensity;
                
                point.rotateX(state.rotationX * Math.PI / 180);
                point.rotateY(state.rotationY * Math.PI / 180);
                
                const projected = point.project(centerX, centerY, 0, state.perspective);
                
                if (firstPoint) {
                    ctx.moveTo(projected.x, projected.y);
                    firstPoint = false;
                } else {
                    ctx.lineTo(projected.x, projected.y);
                }
            }
            
            const hue = (layer * 30 + time * 20) % 360;
            const alpha = 0.3 + 0.4 * (1 - layer / layers);
            
            ctx.strokeStyle = `hsla(${hue}, 100%, 60%, ${alpha})`;
            ctx.lineWidth = 2;
            ctx.shadowBlur = state.vizGlow;
            ctx.shadowColor = `hsl(${hue}, 100%, 60%)`;
            ctx.stroke();
        }
        
        ctx.shadowBlur = 0;
    },

    // Добавим классические 2D визуализаторы для разнообразия
    
    // 9. Круговые волны (классика)
    circularWaves: (ctx, centerX, centerY, dataArray, state, time) => {
        const barCount = 128;
        const radius = 150 * state.vizScale;
        
        for (let i = 0; i < barCount; i++) {
            const angle = (i / barCount) * Math.PI * 2;
            const dataIndex = Math.floor((i / barCount) * dataArray.length);
            const intensity = dataArray[dataIndex] / 255;
            const barHeight = intensity * 150 * state.vizScale;
            
            const x1 = centerX + Math.cos(angle) * radius;
            const y1 = centerY + Math.sin(angle) * radius;
            const x2 = centerX + Math.cos(angle) * (radius + barHeight);
            const y2 = centerY + Math.sin(angle) * (radius + barHeight);
            
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            
            const hue = (angle * 50 + time * 30) % 360;
            ctx.strokeStyle = `hsl(${hue}, 100%, 60%)`;
            ctx.lineWidth = 3;
            ctx.shadowBlur = state.vizGlow * intensity;
            ctx.shadowColor = `hsl(${hue}, 100%, 60%)`;
            ctx.stroke();
        }
        
        ctx.shadowBlur = 0;
    },

    // 10. Частотные столбцы
    frequencyBars: (ctx, centerX, centerY, dataArray, state, time) => {
        const barWidth = (ctx.canvas.width * 0.8) / dataArray.length;
        const startX = ctx.canvas.width * 0.1;
        
        dataArray.forEach((value, i) => {
            const barHeight = (value / 255) * ctx.canvas.height * 0.7;
            const x = startX + i * barWidth;
            const y = ctx.canvas.height - barHeight - 50;
            
            const hue = (i / dataArray.length * 360 + time * 20) % 360;
            
            const gradient = ctx.createLinearGradient(x, y + barHeight, x, y);
            gradient.addColorStop(0, `hsl(${hue}, 100%, 30%)`);
            gradient.addColorStop(1, `hsl(${hue}, 100%, 70%)`);
            
            ctx.fillStyle = gradient;
            ctx.fillRect(x, y, barWidth - 2, barHeight);
            
            ctx.shadowBlur = state.vizGlow;
            ctx.shadowColor = `hsl(${hue}, 100%, 60%)`;
        });
        
        ctx.shadowBlur = 0;
    }
};
