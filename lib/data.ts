export interface House {
  name: string;
  coords: [number, number];
  climate: string;
  temp: number;
  precip: number;
  wall: number;
  ratio: number;
  pitch: number;
  scores: {
    保温: number;
    隔热: number;
    通风: number;
    防潮: number;
    采光: number;
  };
  wallMat: string;
  roof: string;
  courtyard: string;
  insulation: string;
  heatKeep: string;
  ventilation: string;
  moisture: string;
  tempRange: string;
  precipRange?: string;
  humidity?: string;
  sunshine?: string;
  desc: string;
  period: string;
}

export const allHouses: House[] = [
  { name:"陕北窑洞", coords:[109.5,36.5], climate:"严寒区", temp:9.5, precip:495, wall:800, ratio:0.08, pitch:0, scores:{保温:9,隔热:8,通风:4,防潮:3,采光:3}, wallMat:"土/石材/砖/土坯", roof:"拱形平顶", courtyard:"四合院/线形", insulation:"厚层黄土覆盖", heatKeep:"厚黄土+拱形结构", ventilation:"门窗对流+高侧孔", moisture:"抬高地基+防潮层", tempRange:"7~12℃", precipRange:"340~650mm", humidity:"66~78%", sunshine:"2400~2700h", desc:"依托黄土层穴居，厚土保温，冬暖夏凉。", period:"pre_qin" },
  { name:"东北大院", coords:[126.5,45.8], climate:"严寒区", temp:4.0, precip:600, wall:650, ratio:0.25, pitch:25, scores:{保温:8,隔热:6,通风:5,防潮:4,采光:5}, wallMat:"土坯/青砖/红砖", roof:"硬山两面坡", courtyard:"四合院/口袋房", insulation:"厚墙体", heatKeep:"火炕系统+厚墙", ventilation:"门窗对流+烟道", moisture:"抬高地基+排水", tempRange:"-3.6~9℃", precipRange:"355~881mm", humidity:"50~70%", desc:"合院式，火炕取暖，厚墙防风。", period:"ming_qing" },
  { name:"内蒙古毡房", coords:[116.0,43.9], climate:"严寒区", temp:7.0, precip:400, wall:50, ratio:0.05, pitch:15, scores:{保温:6,隔热:5,通风:7,防潮:5,采光:4}, wallMat:"羊毛毡+柳木", roof:"圆形穹顶", courtyard:"无", insulation:"多层毛毡", heatKeep:"火塘+毡围", ventilation:"天窗+掀围毡", moisture:"抬高+排水沟", tempRange:"5~9.9℃", precipRange:"166~647mm", humidity:"50~60%", desc:"穹顶结构，轻便保暖，游牧智慧。", period:"pre_qin" },
  { name:"宁夏回族土坯房", coords:[106.2,38.4], climate:"严寒区", temp:7.0, precip:400, wall:500, ratio:0.10, pitch:15, scores:{保温:7,隔热:6,通风:5,防潮:6,采光:5}, wallMat:"土坯/夯土", roof:"平顶/坡顶", courtyard:"三合院/排排房", insulation:"厚土坯墙", heatKeep:"火炕+草泥抹面", ventilation:"门窗对流", moisture:"砖石碱脚+芦苇隔潮", tempRange:"5~9.9℃", precipRange:"166~647mm", desc:"厚土坯蓄热，半地下室降温。", period:"ming_qing" },
  { name:"新疆阿以旺", coords:[79.9,39.5], climate:"严寒区", temp:10.0, precip:80, wall:650, ratio:0.10, pitch:0, scores:{保温:7,隔热:7,通风:6,防潮:4,采光:6}, wallMat:"土坯/夯土", roof:"平顶可上人", courtyard:"阿以旺厅", insulation:"厚墙+屋顶覆土", heatKeep:"火墙+阿以旺暖室", ventilation:"天窗拔风", moisture:"抬高地基", tempRange:"8.8~12.2℃", precipRange:"35~150mm", humidity:"40~45%", desc:"中央大厅拔风，厚墙隔热。", period:"wei_jin_tang" },
  { name:"北京四合院", coords:[116.4,39.9], climate:"寒冷区", temp:12.0, precip:650, wall:500, ratio:0.18, pitch:25, scores:{保温:7,隔热:6,通风:5,防潮:4,采光:6}, wallMat:"青砖/灰瓦", roof:"硬山卷棚", courtyard:"标准四合院", insulation:"厚墙+游廊", heatKeep:"火炕+双层窗", ventilation:"穿堂风", moisture:"台基+散水", tempRange:"11~13℃", precipRange:"600~700mm", desc:"坐北朝南，庭院采光，防风保温。", period:"ming_qing" },
  { name:"晋中大院", coords:[112.7,37.7], climate:"寒冷区", temp:9.0, precip:470, wall:600, ratio:0.15, pitch:30, scores:{保温:8,隔热:6,通风:5,防潮:5,采光:5}, wallMat:"青砖/石材", roof:"硬山高墙", courtyard:"狭长多重院", insulation:"厚外墙", heatKeep:"火炕+锢窑", ventilation:"院落风道", moisture:"砖石碱脚", tempRange:"7.5~11.7℃", precipRange:"400~540mm", desc:"高墙窄院，保温防匪。", period:"ming_qing" },
  { name:"山东海草房", coords:[122.4,37.2], climate:"寒冷区", temp:11.5, precip:850, wall:850, ratio:0.12, pitch:50, scores:{保温:8,隔热:8,通风:6,防潮:7,采光:5}, wallMat:"石块/海岩石", roof:"海草顶陡坡", courtyard:"合院", insulation:"厚石墙+海草顶", heatKeep:"厚墙+陡坡", ventilation:"穿堂风", moisture:"陡坡排水+海草防潮", tempRange:"11.3~12℃", precipRange:"800~900mm", desc:"海草顶防雨抗风，厚石墙保温。", period:"ming_qing" },
  { name:"河北平顶房", coords:[114.8,40.8], climate:"寒冷区", temp:13.0, precip:550, wall:500, ratio:0.15, pitch:0, scores:{保温:6,隔热:5,通风:5,防潮:5,采光:5}, wallMat:"土坯/砖", roof:"平顶", courtyard:"合院", insulation:"厚墙+覆土", heatKeep:"火炕", ventilation:"门窗对流", moisture:"散水", tempRange:"11~15℃", precipRange:"300~800mm", desc:"平顶晾晒，火炕取暖。", period:"ming_qing" },
  { name:"陕西关中民居", coords:[108.9,34.3], climate:"寒冷区", temp:9.0, precip:650, wall:240, ratio:0.18, pitch:30, scores:{保温:5,隔热:5,通风:6,防潮:5,采光:6}, wallMat:"空心砖/土坯", roof:"硬山坡顶", courtyard:"合院", insulation:"240墙", heatKeep:"火炕", ventilation:"天井拔风", moisture:"砖石碱脚", tempRange:"6~13.6℃", precipRange:"500~800mm", desc:"合院布局，采光保温。", period:"ming_qing" },
  { name:"徽派建筑", coords:[118.3,29.7], climate:"夏热冬冷区", temp:12.0, precip:1900, wall:250, ratio:0.25, pitch:25, scores:{保温:5,隔热:7,通风:8,防潮:6,采光:8}, wallMat:"小青砖/白灰", roof:"坡顶马头墙", courtyard:"天井式", insulation:"马头墙遮阳", heatKeep:"厚墙+天井", ventilation:"天井烟囱效应", moisture:"四水归堂", tempRange:"7.8~17℃", precipRange:"1470~2400mm", humidity:"75~85%", desc:"天井拔风，马头墙防火遮阳。", period:"song_yuan" },
  { name:"江南天井院", coords:[120.5,31.0], climate:"夏热冬冷区", temp:15.5, precip:1250, wall:270, ratio:0.22, pitch:20, scores:{保温:5,隔热:6,通风:8,防潮:7,采光:7}, wallMat:"砖木", roof:"坡顶", courtyard:"天井", insulation:"高墙遮阳", heatKeep:"厚墙", ventilation:"天井拔风", moisture:"青石板排水", tempRange:"15~16.5℃", precipRange:"1000~1500mm", desc:"小天井通风采光，四周高墙。", period:"song_yuan" },
  { name:"川西林盘", coords:[104.0,30.6], climate:"夏热冬冷区", temp:17.0, precip:950, wall:200, ratio:0.20, pitch:20, scores:{保温:4,隔热:5,通风:9,防潮:6,采光:6}, wallMat:"木/砖木", roof:"小青瓦", courtyard:"林盘聚落", insulation:"高大林木", heatKeep:"低层建筑", ventilation:"林木拔风", moisture:"水系环绕", tempRange:"16~18℃", precipRange:"900~1000mm", desc:"林盘调节微气候，水系降温。", period:"ming_qing" },
  { name:"湖南吊脚楼", coords:[109.7,28.3], climate:"夏热冬冷区", temp:17.0, precip:1370, wall:100, ratio:0.10, pitch:25, scores:{保温:4,隔热:5,通风:8,防潮:8,采光:5}, wallMat:"杉木", roof:"坡顶青瓦", courtyard:"无", insulation:"底层架空", heatKeep:"火塘", ventilation:"底层通风", moisture:"干栏架空", tempRange:"16.3~17.9℃", precipRange:"1240~1500mm", desc:"干栏式，防潮防虫，通风极佳。", period:"pre_qin" },
  { name:"湖北天井房", coords:[114.3,30.6], climate:"夏热冬冷区", temp:16.0, precip:1200, wall:300, ratio:0.20, pitch:25, scores:{保温:6,隔热:6,通风:7,防潮:6,采光:7}, wallMat:"砖木", roof:"坡顶", courtyard:"天井合院", insulation:"厚墙", heatKeep:"厚墙+天井", ventilation:"天井拔风", moisture:"排水系统", tempRange:"15.9~16.6℃", precipRange:"1100~1300mm", desc:"天井组织通风排水。", period:"ming_qing" },
  { name:"福建土楼", coords:[117.0,24.7], climate:"夏热冬暖区", temp:18.5, precip:1490, wall:1000, ratio:0.10, pitch:25, scores:{保温:8,隔热:8,通风:6,防潮:7,采光:4}, wallMat:"三合土夯筑", roof:"青瓦坡顶", courtyard:"环形内通廊", insulation:"厚土墙", heatKeep:"厚墙+聚族", ventilation:"环形通廊", moisture:"出檐深远", tempRange:"17.8~19.5℃", precipRange:"1480~1500mm", desc:"巨型土楼，厚墙隔热防风，环形防御。", period:"ming_qing" },
  { name:"广东镬耳屋", coords:[113.1,23.0], climate:"夏热冬暖区", temp:22.0, precip:1575, wall:300, ratio:0.20, pitch:25, scores:{保温:5,隔热:7,通风:7,防潮:6,采光:6}, wallMat:"青砖/麻石", roof:"坡顶镬耳山墙", courtyard:"梳式布局", insulation:"镬耳遮阳", heatKeep:"砖墙", ventilation:"山墙导风", moisture:"天井排水", tempRange:"21~23℃", precipRange:"1430~1720mm", desc:"镬耳山墙挡风引风，适应湿热。", period:"ming_qing" },
  { name:"云南一颗印", coords:[102.7,25.0], climate:"夏热冬暖区", temp:16.0, precip:950, wall:500, ratio:0.08, pitch:25, scores:{保温:6,隔热:7,通风:6,防潮:7,采光:5}, wallMat:"夯土/土坯", roof:"坡顶小青瓦", courtyard:"三间四耳", insulation:"厚土墙", heatKeep:"厚墙+小天井", ventilation:"天井烟囱", moisture:"四水归堂", tempRange:"14~18℃", precipRange:"887~1031mm", desc:"厚墙小窗，防风防晒，天井排水。", period:"ming_qing" },
  { name:"广西干栏式", coords:[110.2,25.2], climate:"夏热冬暖区", temp:20.0, precip:1750, wall:100, ratio:0.15, pitch:25, scores:{保温:4,隔热:5,通风:9,防潮:8,采光:5}, wallMat:"杉木/松木", roof:"坡顶", courtyard:"无", insulation:"底层架空", heatKeep:"火塘", ventilation:"全架空通风", moisture:"干栏防潮", tempRange:"16.5~23.1℃", precipRange:"1500~2000mm", desc:"干栏式极致通风防潮，适应湿热山区。", period:"pre_qin" },
  { name:"海南火山石屋", coords:[110.3,20.0], climate:"夏热冬暖区", temp:24.0, precip:1865, wall:500, ratio:0.10, pitch:30, scores:{保温:7,隔热:8,通风:6,防潮:7,采光:5}, wallMat:"火山石", roof:"坡顶", courtyard:"合院", insulation:"厚石墙", heatKeep:"厚石", ventilation:"门窗对流", moisture:"石材防潮", tempRange:"23.8~24.4℃", precipRange:"1660~2070mm", desc:"火山石隔热，适应高温高湿。", period:"ming_qing" },
  { name:"傣族竹楼", coords:[100.8,22.0], climate:"温和区", temp:21.0, precip:1250, wall:80, ratio:0.15, pitch:25, scores:{保温:4,隔热:5,通风:8,防潮:8,采光:6}, wallMat:"竹子/木材", roof:"人字形坡顶", courtyard:"无", insulation:"架空+竹木", heatKeep:"火塘", ventilation:"全通风", moisture:"底层高架空", tempRange:"19.5~22.4℃", precipRange:"1070~1426mm", desc:"竹楼架空，通风防潮，热带智慧。", period:"pre_qin" },
  { name:"白族三坊一照壁", coords:[100.2,25.6], climate:"温和区", temp:15.0, precip:1080, wall:400, ratio:0.20, pitch:27, scores:{保温:6,隔热:6,通风:7,防潮:6,采光:7}, wallMat:"砖石/土坯", roof:"硬山坡顶", courtyard:"三坊照壁", insulation:"厚墙", heatKeep:"火塘+日照", ventilation:"院落通风", moisture:"青石板排水", tempRange:"14.9~15.1℃", precipRange:"1080mm", desc:"照壁反射阳光，防风聚气。", period:"ming_qing" },
  { name:"纳西族民居", coords:[100.2,26.8], climate:"温和区", temp:13.5, precip:970, wall:500, ratio:0.20, pitch:25, scores:{保温:6,隔热:6,通风:7,防潮:6,采光:7}, wallMat:"土坯/砖石", roof:"悬山青瓦", courtyard:"三坊一照壁", insulation:"厚墙+深出檐", heatKeep:"厚墙+火塘", ventilation:"厦子通风", moisture:"毛石防潮", tempRange:"12.6~14.5℃", precipRange:"940~1000mm", desc:"深出檐遮阳，厚墙保温。", period:"ming_qing" },
  { name:"藏族碉房", coords:[91.1,29.6], climate:"温和区", temp:5.0, precip:500, wall:600, ratio:0.10, pitch:0, scores:{保温:9,隔热:8,通风:5,防潮:6,采光:4}, wallMat:"石块/夯土", roof:"平顶", courtyard:"无/碉院", insulation:"厚石墙", heatKeep:"厚墙+火塘", ventilation:"门窗+烟道", moisture:"石基防潮", tempRange:"-4.4~14.2℃", precipRange:"262~772mm", desc:"石砌厚墙，平顶保暖抗风。", period:"song_yuan" },
  { name:"羌族碉楼", coords:[103.5,31.9], climate:"温和区", temp:2.2, precip:318, wall:1500, ratio:0.08, pitch:0, scores:{保温:9,隔热:9,通风:5,防潮:6,采光:4}, wallMat:"石片/黄泥", roof:"平顶", courtyard:"无", insulation:"巨厚石墙", heatKeep:"厚墙+火塘", ventilation:"窄窗+甬道", moisture:"深基防潮", tempRange:"2.2℃(年均)", precipRange:"318mm", desc:"石墙极厚，冬暖夏凉，防御为主。", period:"song_yuan" }
];

export const climateColors: Record<string, string> = {
  '严寒区': '#4a6fa5',
  '寒冷区': '#b8a389',
  '夏热冬冷区': '#8faa76',
  '夏热冬暖区': '#e28a55',
  '温和区': '#d4a5a5'
};

export const periodLabels: Record<string, { icon: string; label: string; note: string }> = {
  "all": { icon: "🔁", label: "全部时期", note: "25种民居完整呈现，跨越千年智慧。" },
  "pre_qin": { icon: "🏺", label: "史前-先秦", note: "穴居、干栏式萌芽，早期被动适应。" },
  "qin_han": { icon: "🏛️", label: "秦汉", note: "合院雏形，夯土成熟。" },
  "wei_jin_tang": { icon: "⛩️", label: "魏晋-隋唐", note: "天井出现，木构成熟。" },
  "song_yuan": { icon: "🏯", label: "宋元", note: "马头墙、碉楼防御增强。" },
  "ming_qing": { icon: "🏮", label: "明清", note: "民居类型大爆发，智慧巅峰。" }
};
