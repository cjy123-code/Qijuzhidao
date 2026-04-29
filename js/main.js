// main.js - 内嵌数据版本（无需外部 houses.json）
document.addEventListener('DOMContentLoaded', function() {
    // 显示图表加载占位（简单处理）
    const chartContainers = ['mapChart', 'barChart', 'radarChart', 'parallelChart'];
    chartContainers.forEach(id => {
        const el = document.getElementById(id);
        if (el && el.parentNode) {
            const loadingDiv = document.createElement('div');
            loadingDiv.className = 'chart-loading';
            loadingDiv.innerText = '📊 图表加载中...';
            loadingDiv.style.cssText = 'display:flex; align-items:center; justify-content:center; height:100%; background:#faf8f4; border-radius:16px; color:#555;';
            el.style.opacity = '0';
            el.parentNode.style.position = 'relative';
            el.parentNode.insertBefore(loadingDiv, el);
            setTimeout(() => {
                loadingDiv.remove();
                el.style.opacity = '1';
            }, 300);
        }
    });

    // ================= 完整民居数据（25个） =================
    const allHouses = [
        { name: '陕北窑洞', coords: [113.9931,22.5365], climate:'严寒区', temp:10.0, precip:500, wall:800, ratio:0.08, pitch:0, scores:{保温:9,隔热:8,通风:4,防潮:3,采光:3}, desc:'依托黄土层建穴居建筑，墙体厚隔热保温性极强，冬暖夏凉，适配严寒区干旱、昼夜大温差的气候。' },
        { name: '东北大院', coords: [121.2100,31.2482], climate:'严寒区', temp:4.0, precip:600, wall:650, ratio:0.25, pitch:25, scores:{保温:8,隔热:6,通风:5,防潮:4,采光:5}, desc:'合院式民居，院落开阔、墙体厚实门窗紧凑，能有效抵御严寒区冬季强风与低温，侧重防风保暖。' },
        { name: '内蒙古毡房', coords: [113.7916,35.1953], climate:'严寒区', temp:7.0, precip:400, wall:50, ratio:0.05, pitch:15, scores:{保温:6,隔热:5,通风:7,防潮:5,采光:4}, desc:'可拆卸的穹顶式建筑，材质轻便且保暖性好，适配严寒区草原的大风气候，便于游牧迁徙。' },
        { name: '宁夏回族土坯房', coords: [106.0436,31.3537], climate:'严寒区', temp:7.0, precip:400, wall:500, ratio:0.10, pitch:15, scores:{保温:7,隔热:6,通风:5,防潮:6,采光:5}, desc:'以土坯筑墙，墙体厚实蓄热能力强，适配严寒区干燥少雨、冬季寒冷的气候特征。' },
        { name: '新疆阿以旺', coords: [87.5140,43.8909], climate:'严寒区', temp:10.0, precip:80, wall:650, ratio:0.10, pitch:0, scores:{保温:7,隔热:7,通风:6,防潮:4,采光:6}, desc:'以高侧窗、内庭院为主，通风同时减少热量流失，适配严寒区冬季寒冷、夏季干热的气候。' },
        { name: '北京四合院', coords: [116.4224,39.9348], climate:'寒冷区', temp:12.0, precip:650, wall:500, ratio:0.18, pitch:25, scores:{保温:7,隔热:6,通风:5,防潮:4,采光:6}, desc:'经典合院式民居，坐北朝南院落方正，最大化利用采光，有效规避北风，适配寒冷区干燥寒冷气候。' },
        { name: '晋中大院', coords: [112.1380,37.1763], climate:'寒冷区', temp:9.0, precip:470, wall:600, ratio:0.15, pitch:30, scores:{保温:8,隔热:6,通风:5,防潮:5,采光:5}, desc:'高墙深院式建筑，墙体厚实封闭性强，兼具保温、防风与防御功能，适配寒冷区多风、低温的特点。' },
        { name: '山东海草房', coords: [122.4925,37.4568], climate:'寒冷区', temp:11.5, precip:850, wall:850, ratio:0.12, pitch:50, scores:{保温:8,隔热:8,通风:6,防潮:7,采光:5}, desc:'以海草铺顶、石块筑墙，隔热保温且抗风防潮，适配寒冷区沿海多风、冬季湿冷的气候。' },
        { name: '河北平顶房', coords: [117.2036,39.1535], climate:'寒冷区', temp:13.0, precip:550, wall:500, ratio:0.15, pitch:0, scores:{保温:6,隔热:5,通风:5,防潮:5,采光:5}, desc:'平顶设计减少风阻，墙体厚实保暖，适配寒冷区冬季寒冷、降水较少、多北风的气候特征。' },
        { name: '陕西关中民居', coords: [113.6611,23.1679], climate:'寒冷区', temp:9.0, precip:650, wall:240, ratio:0.18, pitch:30, scores:{保温:5,隔热:5,通风:6,防潮:5,采光:6}, desc:'合院布局，墙体厚重、屋檐平缓，注重采光与保温，适配寒冷区冬季低温、昼夜温差较大的气候。' },
        { name: '徽派建筑', coords: [118.6176,29.8747], climate:'夏热冬冷区', temp:12.0, precip:1900, wall:250, ratio:0.25, pitch:25, scores:{保温:5,隔热:7,通风:8,防潮:6,采光:8}, desc:'白墙黛瓦配小天井，马头墙利于防火排水，天井调节微气候，适配夏热冬冷区多雨、夏热冬寒的特点。' },
        { name: '江南天井院', coords: [108.3190,22.8106], climate:'夏热冬冷区', temp:15.5, precip:1250, wall:270, ratio:0.22, pitch:20, scores:{保温:5,隔热:6,通风:8,防潮:7,采光:7}, desc:'以小天井为核心，通风散热快且利于采光，能有效缓解夏季闷热，适配夏热冬冷区高温多雨、冬季湿冷的气候。' },
        { name: '川西林盘', coords: [113.6611,23.1679], climate:'夏热冬冷区', temp:17.0, precip:950, wall:200, ratio:0.20, pitch:20, scores:{保温:4,隔热:5,通风:9,防潮:6,采光:6}, desc:'竹木环绕的田园民居，院落开敞，依托植被调节温度，注重通风防潮，适配夏热冬冷区盆地温润、多雨的气候。' },
        { name: '湖南吊脚楼', coords: [109.5644,26.1641], climate:'夏热冬冷区', temp:17.0, precip:1370, wall:100, ratio:0.10, pitch:25, scores:{保温:4,隔热:5,通风:8,防潮:8,采光:5}, desc:'干栏式结构，底层架空，有效通风防潮、避虫，适配夏热冬冷区山区多雨、地势潮湿、夏季闷热的气候。' },
        { name: '湖北天井房', coords: [113.3347,30.0443], climate:'夏热冬冷区', temp:16.0, precip:1200, wall:300, ratio:0.20, pitch:25, scores:{保温:6,隔热:6,通风:7,防潮:6,采光:7}, desc:'小天井配高窗，利于空气对流与排水，夏季散热冬季聚温，适配夏热冬冷区四季分明、降水充沛的气候。' },
        { name: '福建土楼', coords: [117.0140,24.6678], climate:'夏热冬暖区', temp:18.5, precip:1490, wall:1000, ratio:0.10, pitch:25, scores:{保温:8,隔热:8,通风:6,防潮:7,采光:4}, desc:'巨型环形聚居建筑，墙体厚实隔热、内部通敞通风，兼具防雨抗风功能，适配夏热冬暖区高温高湿、多台风的气候。' },
        { name: '广东镬耳屋', coords: [111.4707,23.1551], climate:'夏热冬暖区', temp:22.0, precip:1575, wall:300, ratio:0.20, pitch:25, scores:{保温:5,隔热:7,通风:7,防潮:6,采光:6}, desc:'标志性镬耳山墙，利于遮阳散热、引导通风，适配夏热冬暖区高温高湿、夏季长的气候特征。' },
        { name: '云南一颗印', coords: [102.6961,25.0204], climate:'夏热冬暖区', temp:16.0, precip:950, wall:500, ratio:0.08, pitch:25, scores:{保温:6,隔热:7,通风:6,防潮:7,采光:5}, desc:'紧凑合院式建筑，外墙厚实、窗户偏小，防风防晒且兼顾保温，适配夏热冬暖区高原多风、昼夜温差大的气候。' },
        { name: '广西干栏式', coords: [108.3020,23.0682], climate:'夏热冬暖区', temp:20.0, precip:1750, wall:100, ratio:0.15, pitch:25, scores:{保温:4,隔热:5,通风:9,防潮:8,采光:5}, desc:'底层架空的木质建筑，通风防潮效果佳，能有效降低室内温度，适配夏热冬暖区多雨、潮湿、夏季闷热的气候。' },
        { name: '海南火山石屋', coords: [110.1823,19.9750], climate:'夏热冬暖区', temp:24.0, precip:1865, wall:500, ratio:0.10, pitch:30, scores:{保温:7,隔热:8,通风:6,防潮:7,采光:5}, desc:'以火山石筑墙，石材隔热性强，墙体厚实且通风良好，适配夏热冬暖区全年高温、多雨、日照强的气候。' },
        { name: '傣族竹楼', coords: [100.8111,22.0083], climate:'温和区', temp:21.0, precip:1250, wall:80, ratio:0.15, pitch:25, scores:{保温:4,隔热:5,通风:8,防潮:8,采光:6}, desc:'纯竹木干栏式建筑，底层全架空，通体通风散热，防潮防虫，适配温和区热带炎热、多雨、地势潮湿的气候。' },
        { name: '白族三坊一照壁', coords: [100.1386,25.8584], climate:'温和区', temp:15.0, precip:1080, wall:400, ratio:0.20, pitch:27, scores:{保温:6,隔热:6,通风:7,防潮:6,采光:7}, desc:'院落规整，照壁反射阳光提升采光，布局注重通风防风，适配温和区四季温和、多风的气候特征。' },
        { name: '纳西族民居', coords: [100.2106,26.9255], climate:'温和区', temp:13.5, precip:970, wall:500, ratio:0.20, pitch:25, scores:{保温:6,隔热:6,通风:7,防潮:6,采光:7}, desc:'土木结构配小天井，墙体厚实兼顾保温隔热，天井利于通风，适配温和区高原温和、昼夜温差较大的气候。' },
        { name: '藏族碉房', coords: [101.8964,30.8848], climate:'温和区', temp:5.0, precip:500, wall:600, ratio:0.10, pitch:0, scores:{保温:9,隔热:8,通风:5,防潮:6,采光:4}, desc:'石砌厚重墙体，平顶设计，保暖性强且能抵御强风，适配温和区高原多风、冬季短暂寒冷的气候。' },
        { name: '羌族碉楼', coords: [103.4621,31.5618], climate:'温和区', temp:2.2, precip:318, wall:1500, ratio:0.08, pitch:0, scores:{保温:9,隔热:9,通风:5,防潮:6,采光:4}, desc:'石木混合结构，墙体厚实、开窗小，兼具防风保温与防御功能，适配温和区山区多风、气候温润的特点。' }
    ];

    // 气候区配色
    const climateColors = {
        '严寒区': '#93C6E7',
        '寒冷区': '#C8C6C6',
        '夏热冬冷区': '#6A994E',
        '夏热冬暖区': '#E9B44C',
        '温和区': '#E8CFF3'
    };

    const climateSelect = document.getElementById('climateFilter');
    const clearBtn = document.getElementById('clearHighlightBtn');
    const exportCSVBtn = document.getElementById('exportCSVBtn');
    const simulateCaveBtn = document.getElementById('simulateCaveBtn');
    const statusDiv = document.getElementById('status');
    const houseInfoDiv = document.getElementById('houseInfo');

    let currentHouses = [...allHouses];
    let currentHighlightIndex = -1;
    let mapChart, barChart, radarChart, parallelChart;

    function updateInfoPanel(house) {
        if (!house) {
            houseInfoDiv.innerHTML = `<p style="color:#888; text-align:center;">点击地图上的红点<br>查看建筑智慧与简介</p>`;
            return;
        }
        const climateColor = climateColors[house.climate] || '#ccc';
        houseInfoDiv.innerHTML = `
            <div id="houseName">${house.name}</div>
            <div class="climate-badge" style="background:${climateColor}20;">${house.climate}</div>
            <p><strong>📖 简介</strong><br>${house.desc}</p>
            <p><strong>🌡️ 年均温</strong> ${house.temp}℃ &nbsp;|&nbsp; <strong>💧 年降水</strong> ${house.precip}mm</p>
            <p><strong>🧱 墙体厚度</strong> ${house.wall}cm &nbsp;|&nbsp; <strong>🪟 窗墙比</strong> ${house.ratio}</p>
            <p><strong>📐 屋顶坡度</strong> ${house.pitch}°</p>
        `;
    }

    function updateParallelChart(highlightIndex = -1) {
        const dataWithStyle = currentHouses.map((h, idx) => {
            const value = [h.wall, h.pitch, h.ratio, h.temp, h.precip];
            const baseColor = climateColors[h.climate] || '#5470c6';
            if (idx === highlightIndex) {
                return { value, lineStyle: { color: '#C0392B', width: 3, opacity: 1 } };
            } else {
                return { value, lineStyle: { color: baseColor, width: 1.5, opacity: 0.7 } };
            }
        });
        parallelChart.setOption({
            parallelAxis: [
                { dim: 0, name: '墙体厚度 (cm)', min: 0, max: 1600 },
                { dim: 1, name: '屋顶坡度 (°)', min: 0, max: 60 },
                { dim: 2, name: '窗墙比', min: 0, max: 0.35 },
                { dim: 3, name: '年均温 (℃)', min: -5, max: 30 },
                { dim: 4, name: '年降水 (mm)', min: 0, max: 2500 }
            ],
            parallel: { left: '5%', right: '13%', top: '10%', bottom: '10%' },
            series: [{ type: 'parallel', data: dataWithStyle, lineStyle: { width: 1.5 }, itemStyle: { color: '#5470c6' } }]
        });
    }

    function clearHighlights() {
        if (currentHighlightIndex !== -1) {
            barChart.dispatchAction({ type: 'downplay', seriesIndex: 0, dataIndex: currentHighlightIndex });
            barChart.dispatchAction({ type: 'downplay', seriesIndex: 1, dataIndex: currentHighlightIndex });
            barChart.dispatchAction({ type: 'downplay', seriesIndex: 2, dataIndex: currentHighlightIndex });
            radarChart.dispatchAction({ type: 'downplay', seriesIndex: 0, dataIndex: currentHighlightIndex });
            updateParallelChart(-1);
            currentHighlightIndex = -1;
            updateInfoPanel(null);
            statusDiv.innerHTML = `✨ 已清除高亮 | 当前显示 ${currentHouses.length} 个民居`;
        } else {
            statusDiv.innerHTML = `ℹ️ 无高亮 | 当前显示 ${currentHouses.length} 个民居`;
        }
    }

    function highlightHouse(index) {
        if (index === currentHighlightIndex) return;
        if (currentHighlightIndex !== -1) {
            barChart.dispatchAction({ type: 'downplay', seriesIndex: 0, dataIndex: currentHighlightIndex });
            barChart.dispatchAction({ type: 'downplay', seriesIndex: 1, dataIndex: currentHighlightIndex });
            barChart.dispatchAction({ type: 'downplay', seriesIndex: 2, dataIndex: currentHighlightIndex });
            radarChart.dispatchAction({ type: 'downplay', seriesIndex: 0, dataIndex: currentHighlightIndex });
        }
        barChart.dispatchAction({ type: 'highlight', seriesIndex: 0, dataIndex: index });
        barChart.dispatchAction({ type: 'highlight', seriesIndex: 1, dataIndex: index });
        barChart.dispatchAction({ type: 'highlight', seriesIndex: 2, dataIndex: index });
        barChart.dispatchAction({ type: 'showTip', seriesIndex: 0, dataIndex: index });
        radarChart.dispatchAction({ type: 'highlight', seriesIndex: 0, dataIndex: index });
        updateParallelChart(index);
        currentHighlightIndex = index;
        const selected = currentHouses[index];
        updateInfoPanel(selected);
        statusDiv.innerHTML = `✅ 当前选中：${selected.name} | 平行坐标图折线已变为红色加粗。`;
    }

    function renderAllCharts() {
        // 地图
        const scatterData = currentHouses.map(h => ({
            name: h.name,
            value: h.coords,
            climateZone: h.climate,
            temp: h.temp,
            itemStyle: { color: climateColors[h.climate] || '#c23531' }
        }));
        mapChart.setOption({
            title: { text: `${currentHouses.length}处典型民居分布（颜色代表气候区）`, left: 'center', top: 0 },
            tooltip: { trigger: 'item', formatter: function(params) {
                if (params.seriesType === 'scatter') return `${params.name}<br/>气候区：${params.data.climateZone}<br/>年均温：${params.data.temp}℃`;
                return params.name;
            } },
            geo: { map: 'china', roam: true, zoom: 1.0, label: { show: false }, emphasis: { label: { show: true } }, itemStyle: { borderColor: '#ccc', areaColor: '#F5F2ED' } },
            series: [{
                name: '民居点位', type: 'scatter', coordinateSystem: 'geo',
                data: scatterData,
                symbolSize: 9,
                label: { show: false },
                itemStyle: { borderColor: '#fff', borderWidth: 1 }
            }]
        });

        // 柱状图
        const wallData = currentHouses.map(h => ({ value: h.wall, itemStyle: { color: climateColors[h.climate] || '#8B5A2B' } }));
        const ratioData = currentHouses.map(h => ({ value: h.ratio, itemStyle: { color: climateColors[h.climate] || '#F4A460' } }));
        const pitchData = currentHouses.map(h => ({ value: h.pitch, itemStyle: { color: climateColors[h.climate] || '#6B8E7B' } }));
        barChart.setOption({
            tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
            legend: { data: ['墙体厚度 (cm)', '窗墙比', '屋顶坡度 (°)'], left: 'left', top: 0 },
            grid: { containLabel: true, left: '8%', right: '8%' },
            xAxis: { type: 'category', data: currentHouses.map(h => h.name), axisLabel: { rotate: 45, interval: 0, fontSize: 10 } },
            yAxis: [ { type: 'value', name: '墙体厚度 / 屋顶坡度', min: 0 }, { type: 'value', name: '窗墙比', min: 0, max: 0.5 } ],
            series: [
                { name: '墙体厚度 (cm)', type: 'bar', data: wallData, barWidth: '40%' },
                { name: '窗墙比', type: 'line', yAxisIndex: 1, data: ratioData, symbol: 'circle', lineStyle: { width: 2 } },
                { name: '屋顶坡度 (°)', type: 'bar', data: pitchData, barWidth: '40%' }
            ]
        });

        // 雷达图
        const radarSeriesData = currentHouses.map(house => ({
            name: house.name,
            value: [house.scores.保温, house.scores.隔热, house.scores.通风, house.scores.防潮, house.scores.采光],
            lineStyle: { color: climateColors[house.climate] || '#5470c6', width: 2 },
            areaStyle: { color: climateColors[house.climate] ? climateColors[house.climate] + '40' : '#5470c640' }
        }));
        radarChart.setOption({
            tooltip: { trigger: 'item' },
            legend: { orient: window.innerWidth < 768 ? 'horizontal' : 'vertical', left: window.innerWidth < 768 ? 'center' : 'left', type: 'scroll', pageIconColor: '#6A994E' },
            radar: { indicator: [ { name: '保温性', max: 10 }, { name: '隔热性', max: 10 }, { name: '通风性', max: 10 }, { name: '防潮性', max: 10 }, { name: '采光性', max: 10 } ], shape: 'circle', name: { textStyle: { fontSize: 10 } } },
            series: [{ type: 'radar', data: radarSeriesData, symbolSize: 4 }]
        });

        updateParallelChart(-1);
        currentHighlightIndex = -1;
        updateInfoPanel(null);
        statusDiv.innerHTML = `✅ 可视化加载完成，共 ${currentHouses.length} 个民居 | 图表颜色按气候区分组，点击红点查看详情。`;
    }

    function filterByClimate(climateValue) {
        if (climateValue === 'all') currentHouses = [...allHouses];
        else currentHouses = allHouses.filter(h => h.climate === climateValue);
        renderAllCharts();
        bindMapClick();
    }

    function bindMapClick() {
        mapChart.off('click');
        mapChart.on('click', function(params) {
            if (params.seriesType === 'scatter' && params.data) {
                const houseName = params.data.name;
                const idx = currentHouses.findIndex(h => h.name === houseName);
                if (idx !== -1) highlightHouse(idx);
            }
        });
    }

    function exportToCSV() {
        const data = currentHouses.map(h => ({
            名称: h.name, 气候区: h.climate, 年均温: h.temp, 年降水: h.precip,
            墙体厚度_cm: h.wall, 窗墙比: h.ratio, 屋顶坡度: h.pitch,
            保温性: h.scores.保温, 隔热性: h.scores.隔热, 通风性: h.scores.通风, 防潮性: h.scores.防潮, 采光性: h.scores.采光,
            简介: h.desc
        }));
        const headers = Object.keys(data[0]);
        const csvRows = [headers.join(',')];
        for (const row of data) {
            const values = headers.map(header => JSON.stringify(row[header] ?? ''));
            csvRows.push(values.join(','));
        }
        const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `民居数据_${new Date().toISOString().slice(0,19)}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    }

    function exportChartAsImage(chartId, filename) {
        const chart = echarts.getInstanceByDom(document.getElementById(chartId));
        if (!chart) return;
        const url = chart.getDataURL({ type: 'png', pixelRatio: 2 });
        const a = document.createElement('a');
        a.href = url;
        a.download = `${filename}.png`;
        a.click();
    }

    function showCaveSimulation() {
        const modal = document.createElement('div');
        modal.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.7); display:flex; justify-content:center; align-items:center; z-index:2000;';
        const card = document.createElement('div');
        card.style.cssText = 'background:white; border-radius:20px; width:90%; max-width:650px; padding:20px; box-shadow:0 10px 25px rgba(0,0,0,0.2);';
        card.innerHTML = `<h3 style="margin-bottom:15px; text-align:center;">🏺 陕北窑洞 · 冬暖夏凉动态模拟</h3><div id="tempSimChart" style="height:350px;"></div><button id="closeSimBtn" style="margin-top:15px; padding:8px 16px; background:#2A3B4C; color:white; border:none; border-radius:30px; cursor:pointer;">关闭</button>`;
        modal.appendChild(card);
        document.body.appendChild(modal);
        const simChart = echarts.init(document.getElementById('tempSimChart'));
        simChart.setOption({
            tooltip: { trigger: 'axis' },
            xAxis: { type: 'category', data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'] },
            yAxis: { type: 'value', name: '温度 (°C)' },
            series: [
                { name: '室外温度', type: 'line', data: [-5, -2, 5, 12, 18, 24, 28, 26, 20, 12, 4, -2], lineStyle: { color: '#91cc75', width: 2 } },
                { name: '窑洞室内温度', type: 'line', data: [12, 12, 13, 14, 16, 17, 18, 18, 17, 16, 14, 13], lineStyle: { color: '#c23531', width: 3 }, symbol: 'circle' }
            ],
            legend: { data: ['室外温度', '窑洞室内温度'], left: 'center', top: 0 }
        });
        document.getElementById('closeSimBtn').addEventListener('click', () => modal.remove());
        modal.addEventListener('click', (e) => { if(e.target === modal) modal.remove(); });
    }

    function initCharts() {
        mapChart = echarts.init(document.getElementById('mapChart'));
        barChart = echarts.init(document.getElementById('barChart'));
        radarChart = echarts.init(document.getElementById('radarChart'));
        parallelChart = echarts.init(document.getElementById('parallelChart'));
        renderAllCharts();
        bindMapClick();

        document.querySelectorAll('.export-img-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const chartId = btn.getAttribute('data-chart');
                exportChartAsImage(chartId, chartId);
            });
        });
    }

    climateSelect.addEventListener('change', (e) => filterByClimate(e.target.value));
    clearBtn.addEventListener('click', clearHighlights);
    exportCSVBtn.addEventListener('click', exportToCSV);
    simulateCaveBtn.addEventListener('click', showCaveSimulation);
    window.addEventListener('resize', () => {
        if (mapChart) mapChart.resize();
        if (barChart) barChart.resize();
        if (radarChart) radarChart.resize();
        if (parallelChart) parallelChart.resize();
        if (radarChart) {
            radarChart.setOption({
                legend: { orient: window.innerWidth < 768 ? 'horizontal' : 'vertical', left: window.innerWidth < 768 ? 'center' : 'left' }
            });
        }
    });

    const backBtn = document.getElementById('backToTop');
    if (backBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) backBtn.classList.add('show');
            else backBtn.classList.remove('show');
        });
        backBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    initCharts();
});