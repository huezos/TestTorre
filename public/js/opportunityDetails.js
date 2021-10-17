new Vue({
    el: "#app",
    data: {
        loading: true,
        opportunity: "",
        details: {},
        members: [],
        languages: [],
        owner: {},
        email: "",
        objective: "",
    },
    mounted: function(){
        var elementVue = this;
        var inputId = this.$refs["id"];
        var inputEmail = this.$refs["email"];
        this.opportunity = inputId.value;
        this.email = inputEmail.value;
        inputId.remove();
        inputEmail.remove();
        axios.get("https://torre.co/api/suite/opportunities/" + this.opportunity)
            .then(function(response){
                var data = response.data;
                elementVue.members = data.members;
                elementVue.owner = data.owner;
                elementVue.languages = data.languages;
                elementVue.details = data.details;
                elementVue.objective = data.objective;
                axios.post("/saveOpportunityVisit", {
                    email: elementVue.email,
                    opportunity: elementVue.opportunity,
                    objective:  elementVue.objective,
                }).then(function(response){
                    elementVue.loading = false;
                });
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
        /**
         * Function to delete the relation between opportunity and email
         */
        deleteRelationship: function(){
            var elementVue = this;
            this.loading = true;
            axios.post("/deleteOpportunity", {
                    email: this.email,
                    opportunity: this.opportunity,
                }).then(function(response){
                    elementVue.loading = false;
                });
        },
    },
});