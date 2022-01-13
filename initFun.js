import AMapLoader from "@amap/amap-jsapi-loader";

function IsPc() {
  const userAgent = navigator.userAgent,
    Agents = [
      "Android",
      "iPhone",
      "SymbianOS",
      "Windows Phone",
      "iPad",
      "iPod",
    ];
  return Agents.some((i) => {
    return userAgent.includes(i);
  });
}

const initMap = (callback) => {
  return new Promise(async (resolve, reject) => {
    const AMap = await AMapLoader.load({
      key: "--", // 申请好的Web端开发者Key，首次调用 load 时必填
      version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: ["AMap.Geolocation", "AMap.CitySearch"], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    });
    callback(AMap);
    resolve(AMap);
  });
};
// // 定位实现
// const geolocation = (AMap) => {
//   const result = IsPc();
//   // 返回的值是true（移动端）/false（web端） 解决：电脑只能进行ip定位，定位到当前的城市；具体位置无法定位；
//   // web端定位
//   if (!result) {
//     AMap.plugin("AMap.CitySearch", function () {
//       const citySearch = new AMap.CitySearch();
//       citySearch.getLocalCity((status, result) => {
//         if (status === "complete" && result.info === "OK") {
//           // 查询成功，result即为当前所在城市信息
//           //   console.log(result); province city
//         }
//       });
//     });
//     return;
//   }
//   // 手机上精准定位 在浏览器会报错
//   AMap.plugin("AMap.Geolocation", function () {
//     const geolocation = new AMap.Geolocation({
//       // 是否使用高精度定位，默认：true
//       enableHighAccuracy: true,
//       // 设置定位超时时间，默认：无穷大
//       timeout: 10000,
//       // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
//       buttonOffset: new AMap.Pixel(10, 20),
//       //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
//       zoomToAccuracy: true,
//       //  定位按钮的排放位置,  RB表示右下
//       buttonPosition: "RB",
//     });

//     geolocation.getCurrentPosition((status, result) => {
//       if (status === "complete") {
//         console.log(result);
//       } else {
//         alert("定位失败");
//         console.log(status);
//       }
//     });
//   });
// };
// const searchPlugin = (AMap) => {
//   AMap &&
//     AMap.plugin("AMap.AutoComplete", () => {
//       // 实例化AutoComplete
//       const autoComplete = new AMap.AutoComplete({
//         //city 限定城市，默认全国
//         city: "全国",
//       });
//       // 根据关键字进行搜索
//       autoComplete.search(keyword, function (status, result) {
//         // 搜索成功时，result即是对应的匹配数据
//         console.log(result);
//       });
//     });
// };
export { initMap };
