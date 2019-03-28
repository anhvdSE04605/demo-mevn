<template>
  <div class="my-3 my-md-5">
    <div class="container">
      <div class="page-header">
        <h1 class="page-title">Tin tức</h1>
      </div>
      <div class="row row-cards row-deck">
        <div v-for="post in posts" :key="post._id" class="col-lg-6">
          <div class="card card-aside">
            <a
              v-bind:href="post.source"
              class="card-aside-column"
              v-bind:style="{ 'background-image': 'url(' + post.imageUrl + ')' }"
              target="_blank"
            ></a>
            <div class="card-body d-flex flex-column">
              <h4>
                <a v-bind:href="post.source" target="_blank">{{ post.title }}</a>
              </h4>
              <div class="text-muted">{{ post.description }}</div>
              <div class="d-flex align-items-center pt-5 mt-auto">
                <table>
                  <tbody>
                    <tr>
                      <td width="1">
                        <i class="fa fa-calendar-week text-muted"></i>
                      </td>
                      <td>
                        <small class="d-block text-muted">{{ post.dateDiff }}</small>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <infinite-loading @infinite="infiniteHandler"></infinite-loading>
    </div>
  </div>
</template>

<script>
import NewsService from "../services/NewsService.js";
import "../assets/css/style.css";
import axios from "axios";

const api = "http://localhost:8081/news";
const rtf = new Intl.RelativeTimeFormat("vi", { numeric: "auto" });
const d = new Date();

export default {
  name: "news",
  data() {
    return {
      page: 1,
      posts: []
    };
  },
  mounted() {},
  methods: {
    infiniteHandler: function($state) {
      axios
        .get(api, {
          params: {
            page: this.page
          }
        })
        .then(({ data }) => {
          if (data.length) {
            this.page += 1;
            const posts = data;
            posts.forEach(post => {
              const pdate = new Date(post.pubDate);
              const dateDiff = pdate.getDate() - d.getDate();
              post.dateDiff = isNaN(dateDiff)
                ? post.pubDate
                : rtf.format(dateDiff, "day");
            });
            this.posts.push(...posts);
            $state.loaded();
          } else {
            $state.complete();
          }
        });
    }
  }
};
</script>
