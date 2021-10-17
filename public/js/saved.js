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
                elementVue.opportunities = data.opportunities;
                elementVue.loading = false;
            });
    },
    methods: {
        /**
         * Function to open details from the opportunity
         * @param object opportunity
         */
         openOpportunity: function(opportunity){
            var form = document.createElement("form");
            var inputOportunity = document.createElement("input");
            var inputEmail = document.createElement("input");
            form.target = "_blank";
            form.action = "opportunity";
            form.method = "POST";
            inputOportunity.name = "opportunity";
            inputOportunity.value = opportunity["id"];
            inputEmail.name = "email";
            inputEmail.value = this.email;
            form.appendChild(inputOportunity);
            form.appendChild(inputEmail);
            document.body.appendChild(form);
            form.submit();
            document.body.removeChild(form);
        },
    },
});