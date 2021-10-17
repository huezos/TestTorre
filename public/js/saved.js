new Vue({
    el: "#app",
    data: {
        loading: true,
        opportunities: [],
        email: "",
    },
    mounted: function(){
        var elementVue = this;
        var inputEmail = this.$refs["email"];
        this.email = inputEmail.value;
        inputEmail.remove();
        axios.post("/opportunitiesSaved", {
                email: this.email,
            })
            .then(function(response){
                var data = response.data;
                
                elementVue.loading = false;
            });
    },
    methods: {
        /**
         * Function to save the relation between opportunity and email
         */
        saveRelationship: function(){
            var elementVue = this;
            this.loading = true;
            axios.post("/saveOpportunity", {
                    email: this.email,
                    opportunity: this.opportunity,
                    objectiveOpportunity:  this.objective,
                }).then(function(response){
                    elementVue.loading = false;
                });
        },
    },
});