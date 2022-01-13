import { Modal, Select, Spin } from "antd";
import { useEffect, useState } from "react";
import { initMap } from "./initFun";
import { useMapEffect } from "./useMapEffect";
const { Option } = Select;

let preMarker, position, searchFun, geocoder;
// 组件
const SelfMap = ({ visible, render }) => {
  const [searchInput, setSearchInput] = useState();
  const [options, setOptions] = useState();
  const [map, Amap] = useMapEffect(initMap, (AMap) => {
    if (AMap) {
      // 搜索插件
      AMap.plugin("AMap.AutoComplete", () => {
        // 实例化AutoComplete
        searchFun = new AMap.AutoComplete({
          //city 限定城市，默认全国
          city: "全国",
        });
      });
      // 逆向地里编码插件
      AMap.plugin("AMap.Geocoder", () => {
        geocoder = new AMap.Geocoder({});
      });
    }
  });

  if (map && !map.hasEvents("click")) {
    map.on("click", (e) => {
      console.log(e);
      position = [e.lnglat.lng, e.lnglat.lat];
      if (Amap) {
        const currentMarker = new Amap.Marker({
          position, // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        });
        preMarker && map.remove(preMarker);
        // 将创建的点标记添加到已有的地图实例：
        map.add(currentMarker);
        preMarker = currentMarker;
      }
    });
  }

  const onSearch = (e) => {
      setSearchInput(e);
      // 根据关键字进行搜索
      searchFun &&
        searchFun.search(searchInput, function (status, result) {
          console.log(result);
          // 搜索成功时，result即是对应的匹配数据
          const { info, tips } = result;
          if (info !== "OK") return;
          const opactionResult = tips.map((item, index) => {
            return (
              <Option
                key={index}
                value={`${item?.location?.lng},${item?.location?.lat}`}
              >
                {item.name}
              </Option>
            );
          });
          setOptions(opactionResult);
        });
    },
    onChange = (e) => {
      position = [...e.split(",")];
      if (Amap) {
        const currentMarker = new Amap.Marker({
          position, // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        });
        preMarker && map.remove(preMarker);
        // 将创建的点标记添加到已有的地图实例：
        map.add(currentMarker);
        preMarker = currentMarker;
      }
      if (map) map.setFitView();
    },
    submit = () => {
      geocoder.getAddress(position, function (status, result) {
        if (status === "complete" && result.info === "OK") {
          render({
            name: result.regeocode.formattedAddress || "",
            position,
          });
        }
      });
    };
  useEffect(() => {
    return () => {
      map && map.off("click");
    };
  });
  return (
    <>
      <Modal
        title="地图组件"
        visible={visible}
        onOk={submit}
        onCancel={() => {
            render();
        }}
        width={800}
      >
        <div
          style={{
            position: "absolute",
            right: "40px",
            top: "90px",
            zIndex: 10,
          }}
        >
          {" "}
          <Select
            style={{ width: "240px" }}
            showSearch
            optionFilterProp="children"
            onChange={(e) => {
              onChange(e);
            }}
            onSearch={(e) => {
              onSearch(e);
            }}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {options ?? null}
          </Select>
        </div>
        <div id="container" style={{ width: "750px", height: "500px" }}></div>
      </Modal>
    </>
  );
};
export default SelfMap;
