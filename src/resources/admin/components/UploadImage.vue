<template>
  <div id="photo-form-container">
      <v-btn @click="render">Upload</v-btn>
  </div>

</template>

<script>
import { createNamespacedHelpers } from "vuex";
const {mapActions, mapState} = createNamespacedHelpers(
  "productAdmin"
);
export default {
    data() {
        return {
            image_path: ''
        }
    },
    computed: {
        ...mapState({signature: "signature"})
    },
    methods: {
        ...mapActions(['setSignature']),
        render() {
            this.setSignature()
            const generateSignature = async (callback) => {
            try {
            const signature = this.signature;
                callback(signature.data);
            } catch (err) {
                console.log(err);
            }
        };
            // let widget = window.cloudinary.createUploadWidget({
            //     cloudName: "dum4qhogr",
            //     uploadSignature: generateSignature,
            //     apiKey: "879932131293295",
            //     uploadPreset: "ml_default",
            // }, (error, result) => { 
    
            // if (!error && result && result.event === "success") { 
            //  this.image_path = result.info.url;
            //  console.log(this.image_path)
            // } 
            // });
            let widget = window.cloudinary.applyUploadWidget(document.getElementById('upload_widget_opener'), 
            {   
                api_key:"879932131293295", 
                cloudName:"dum4qhogr",
                uploadPreset:"ml_default", 
                uploadSignature:generateSignature, 
            }, 
            (result) => { console.log(result) });
            return console.log(widget.open());
        }
    }

}
</script>

<style>

</style>