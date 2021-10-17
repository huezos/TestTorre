new Vue({
    el: "#app",
    data: {
        opportunities: [],
        total: 0,
        size: 10,
    },
    mounted: function(){
        var elementVue = this;
        axios.post("https://search.torre.co/opportunities/_search/", {
                size: elementVue.size
            })
            .then(function(response){
                elementVue.total = response.total;
                elementVue.opportunities = response.results;
            });
    },
    methods: {

    },
});