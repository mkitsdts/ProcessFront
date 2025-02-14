<template>
  <div class="order-operation-container">
    <h1>ESCROW</h1>
    <div>
      <input type="file" accept=".pdf" @change="handleFileUpload" />
      <button @click="uploadFile">上传文件</button>
    </div>
  </div>
</template>

<script>
export default {
    methods: {
        fetchOrderAllInfo() {
          // Fetch order information by this.id
          fetch('http://localhost:8080/order/detail?id=' + this.id)
            .then(response => response.json())
            .then(data => {
              this.order = data;
          })
          .catch(error => {
            console.error('Error fetching orders:', error);
          });
        },
        handleFileUpload(event) {
          const file = event.target.files[0];
          if (file && file.type === 'application/pdf') {
            this.selectedFile = file;
          } else {
            alert('请选择一个PDF文件');
            this.selectedFile = null;
          }
        },
        uploadFile() {
          if (!this.selectedFile) {
            alert('请选择一个文件');
            return;
          }

          const formData = new FormData();
          formData.append('file', this.selectedFile);
    
          fetch('http://localhost:8080/order/upload?id='+this.id+'&index='+this.index, {
            method: 'POST',
            body: formData
          })
            .then(response => response.json())
            .then(data => {
              console.log('File uploaded successfully:', data);
              alert('文件上传成功');
            })
            .catch(error => {
              console.error('Error uploading file:', error);
              alert('文件上传失败');
            });
        }
    },
    data() {
    return {
      index: null,
      id: null,
      order: {},
      selectedFile: null
    };
  },
  created() {
    this.index = this.$route.query.index;
    this.id = this.$route.query.orderId;
    this.fetchOrderAllInfo();
  }
};
</script>

<style>
.order-operation-container {
  padding: 20px;
}
</style>