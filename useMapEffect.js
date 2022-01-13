import { useEffect, useState } from "react";

export const useMapEffect = (initMap, callback) => {
  const [_map, setMap] = useState();
  const [_AMap, setAmap] = useState();
  useEffect(() => {
    initMap((AMap) => {
      const map = new AMap.Map("container", {
        //设置地图容器id
        viewMode: "3D", //是否为3D地图模式
        zoom: 9, //初始化地图级别
      });
      setMap(map);
      setAmap(AMap);
      callback(AMap)
    });
  }, []);
  return [_map, _AMap];
};
