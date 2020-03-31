<template>
    <b-row>
        <b-col md="12">
            <b-card
                v-for="(data, $index) in list" :key="$index"
                no-body
                img-src="https://picsum.photos/600/300/?image=25"
                img-alt="Image"
                img-top
                class="mb-4"
                style="width:100%"
            >
                <template v-slot:header>
                    <b-card-title v-text="data.title"></b-card-title>
                </template>
                <b-card-body>
                    <b-card-text v-text="data.ShortBody"></b-card-text>
                </b-card-body>
                <b-card-footer class="h1">
                    <b-col md="4"><b-icon icon="chat-fill"></b-icon></b-col>
                    <b-col md="4"></b-col>
                    <b-col md="4"></b-col>
                </b-card-footer>
            </b-card>
            <no-ssr>
                <infinite-loading @infinite="infiniteHandler"></infinite-loading>
            </no-ssr>
        </b-col>
    </b-row>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading';
import { BIcon, BIconChatFill } from 'bootstrap-vue'
const api = 'v1/api/blog/';
export default {
    components:{
        InfiniteLoading,
        BIcon,
        BIconChatFill
    },
    data(){
        return {
            page: 1,
            list: [],
            limit: 10,
        }
    },
    methods:{
        async infiniteHandler($state) {
            this.$axios.post(api, {
                params: {
                    page: this.page,
                    limit: this.limit,
                },
            }).then(({ data }) => {
                if (data.length) {
                    this.page += 1;
                    this.list.push(...data);
                    $state.loaded();
                } else {
                    $state.complete();
                }
            }).catch(error => {
                console.log("Errore: "+error);
            });
        },
    },
}
</script>