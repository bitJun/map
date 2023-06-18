<template>
  <div class="title">
    <p>Thai xMap</p>
    <p>Notice: {{state.notice}}</p>
  </div>
  <div class="pc-map_view">
    <div class="pc-map_view_ad">
      <a
        v-for="item in state.adListRight"
        class="pc-map_view_ad_item"
        :key="item.sort"
        target="_blank"
        :href="item.url"
      >
        <img
          :src="item.display_img"
          class="pc-map_view_ad_item_img"
        />
      </a>
    </div>
    <div class="pc-map_view_center">
      <baidu-map
        class="pc-map_view_center_container"
        center="曼谷"
        :zoom="15"
        @ready="handler"
        @rightclick="handlerClick"
      >
        <bm-marker
          v-for="(item, index) in state.mapList"
          :position="{lng: item.lng, lat: item.lat}"
          :dragging="true" 
          @click="infoWindowOpen(index)"
        >
          <bm-info-window
            :show="item.show"
            @close="infoWindowClose(index)"
            @open="infoWindowOpen(index)"
          >
            <p>{{item.name}}</p>
            <p>评论：{{item.comment}}</p>
            <p>联系方式：{{item.contact_information}}</p>
            <div>
              图片：
              <img
                :src="item.pic_url"
              />
            </div>
          </bm-info-window>
        </bm-marker>
        <bm-marker
          :position="state.infoCenter"
          :dragging="true" 
          @click="newInfoWindowOpen()"
        >
          <bm-info-window
            :show="show"
            @close="newInfoWindowClose()"
            @open="newInfoWindowOpen()"
          >
            <a-form
              :model="addInfo"
              name="basic"
              :label-col="{ span: 8 }"
              :wrapper-col="{ span: 16 }"
              autocomplete="off"
              @finish="onFinish"
              @finishFailed="onFinishFailed"
            >
              <a-form-item
                label="名称"
                name="name"
                :rules="[{ required: true, message: 'Please input your username!' }]"
              >
                <a-input v-model:value="addInfo.name" />
              </a-form-item>
              <a-form-item
                label="联系方式"
                name="contact_information"
                :rules="[{ required: true, message: 'Please input your password!' }]"
              >
                <a-input v-model:value="addInfo.contact_information" />
              </a-form-item>
              <a-form-item
                label="评论"
                name="comment"
                :rules="[{ required: true, message: 'Please input your username!' }]"
              >
                <a-input v-model:value="addInfo.comment" />
              </a-form-item>
              <a-form-item
                label="联系方式"
                name="pic_url"
              >
                <a-upload
                  v-model:file-list="fileList"
                  name="avatar"
                  list-type="picture-card"
                  class="avatar-uploader"
                  :show-upload-list="false"
                  action=""
                  @change="handleChange"
                >
                  <img v-if="addInfo.pic_url" :src="addInfo.pic_url" alt="avatar" />
                  <div v-else>
                    <loading-outlined v-if="loading"></loading-outlined>
                    <plus-outlined v-else></plus-outlined>
                    <div class="ant-upload-text">Upload</div>
                  </div>
                </a-upload>
              </a-form-item>
              <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
                <a-button type="primary" html-type="submit">提交</a-button>
              </a-form-item>
            </a-form>
          </bm-info-window>
        </bm-marker>
      </baidu-map>
    </div>
    <div class="pc-map_view_ad">
      <a
        v-for="item in state.adListRight"
        class="pc-map_view_ad_item"
        :key="item.sort"
        target="_blank"
        :href="item.url"
      >
        <img
          :src="item.display_img"
          class="pc-map_view_ad_item_img"
        />
      </a>
    </div>
  </div>
</template>
<script setup>
import { message } from 'ant-design-vue';
import {
  getAdList,
  getNoticeList,
  getMapList,
  postUpload,
  postMapAdd
} from '@/api';
import { onMounted, ref, reactive } from 'vue';
const center = ref({lng: 13.7305620000, lat: 100.5704780000});
const zoom = ref(3);
const state = reactive({
  adListLeft: [],
  adListRight: [],
  mapList: [],
  notice: '',
  infoCenter: {
    lng: '',
    lat: ''
  }
});
const show = ref(false);
const addInfo = reactive({
  name: '',
  contact_information: '',
  comment: '',
  pic_url: ''
});
onMounted(()=>{
  getAdList()
    .then(res=>{
      state.adListLeft = res.list.filter((item,index)=>{
        return index % 2 == 1;
      })
      state.adListRight = res.list.filter((item,index)=>{
        return index % 2 == 0;
      })
    });
  getNoticeList()
    .then(res=>{
      state.notice = res.notice;
    })
  onLoad();
});

const handler = ({BMap, map}) => {
  console.log(BMap, map);
  center.value.lng = 116.404;
  center.value.lat = 39.915;
  zoom.value = 15;
}

const handlerClick = ({type, target, point, pixel, overlay}) =>{
  state.infoCenter = {
    lng: point.lng,
    lat: point.lat
  }
  show.value = true;
  console.log(3)
}

const onLoad = () => {
  getMapList()
    .then(res=>{
      let list = res.list;
      list = list.map(item=>{
        item.show = false;
        return item;
      });
      state.mapList = list;
    });
}

const infoWindowOpen = (index) => {
  let list = state.mapList;
  console.log('list', index)
  list = list.map((item, key) => {
    if (key == index) {
      item.show = true;
    }
    return item;
  });
  state.mapList = list;
}
const infoWindowClose = (index) => {
  let list = state.mapList;
  list = list.map((item, key) => {
    if (key == index) {
      item.show = false;
    }
    return item;
  });
  state.mapList = list;
}

const newInfoWindowOpen = () => {
  console.log(1)
  show.value = true;
}
const newInfoWindowClose = () => {
  console.log(2)
  show.value = false;
  state.infoCenter = {
    lng: '',
    lat: ''
  }
}
const onFinish = (values) => {
  let params = new FormData();
  params.append('comment', values.comment);
  params.append('contact_information', values.contact_information);
  params.append('name', values.name);
  params.append('lng', state.infoCenter.lng);
  params.append('lat', state.infoCenter.lat);
  params.append('pic_url', addInfo.pic_url);
  postMapAdd(params)
    .then(res=>{
      message.success(res.message);
      onLoad();
      state.infoCenter.lng = '';
      state.lat.lng = '';
      addInfo.pic_url = '';
      show.value = false;
    })
};

const onFinishFailed = (errorInfo) => {
  
};

const handleChange = (file) => {
  let params = new FormData();
  params.append('file', file.file.originFileObj);
  postUpload(params)
    .then(res=>{
      message.success('操作成功');
      addInfo.pic_url = res.path;
    })
};

</script>

<style lang="less">
.title {
  height: 80px;
  p {
    line-height: 40px;
    font-size: 24px;
    color: rgba(0, 0, 0, 0.9);
    margin: 0;
  }
}
.pc-map_view {
  width: 100vw;
  height: calc(100vh - 80px);
  display: flex;
  &_ad {
    width: 100px;
    height: 100%;
    &_item {
      display: block;
      cursor: pointer;
      &_img {
        width: 100px;
      }
    }
  }
  &_center {
    flex: 1;
    &_container {
      width: 100%;
      height: calc(100vh - 80px);
    }
  }
}
</style>