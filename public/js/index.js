new Vue({
    el: "#app",
    data: {
        opportunities: [],
        total: 0,
        size: 10,
        loading: true,
        sizes: [10, 20, 50, 100],
        textSearch: "",
    },
    computed: {
        opportunitiesFiltered: function(){
            var opportunities = this.opportunities;
            var textSearch = this.textSearch.toUpperCase();
            if(textSearch != ""){
                opportunities = opportunities.filter(function(opportunity){
                    return opportunity["objective"].toUpperCase().includes(textSearch) || 
                        (opportunity["tagline"] || "").toUpperCase().includes(textSearch);
                });
            }
            return opportunities;
        },
    },
    mounted: function(){
        this.searchOpportunities();
    },
    methods: {
        /**
         * Function to search opportunities
         */
        searchOpportunities: function(){
            var elementVue = this;
            this.loading = true;
            axios.post("https://search.torre.co/opportunities/_search/?" +
                "size=" + this.size)
                .then(function(response){
                    elementVue.saveOpportunities(response.data);
                });
        },
        /**
         * Functio to save the opportunities
         * @param object data
         */
        saveOpportunities: function(data){
            this.total = data.total;
            this.opportunities = data.results;
            this.loading = false;
        },
    },
});