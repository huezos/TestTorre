new Vue({
    el: "#app",
    data: {
        loading: true,
        idOpportunity: "",
        details: {},
        members: [],
        languages: [],
        owner: {},
    },
    mounted: function(){
        var elementVue = this;
        var inputId = this.$refs["id"];
        this.idOpportunity = inputId.value;
        inputId.remove();
        axios.get("https://torre.co/api/suite/opportunities/" + this.idOpportunity)
            .then(function(response){
                var data = response.data;
                elementVue.members = data.members;
                elementVue.owner = data.owner;
                elementVue.languages = data.languages;
                elementVue.details = data.details;
                elementVue.loading = false;
            });
    },
    methods: {

    },
});