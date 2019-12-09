<template>
<section class="hero has-background-black-bis is-fullheight">
  <div class="hero-body">
    <div v-if="fileData" class="container">
    <table class="is-full-width is-scrollable">
      <thead>
        <tr>
          <th>File Name</th>
          <th>Size (Bytes)</th>
          <th>Download</th>
          <th>Last Modified</th>
        </tr>
      </thead>
      <tbody v-for="files in fileData" :key="files.id" class="has-background-primary">
        <tr>
          <td>{{files.name}}</td>
          <td>{{files.size}}</td>
          <td><button v-on:click="downloadFileSubmit(files.id)" class="button is-success">Download</button></td>
          <td></td>
        </tr>
      </tbody>
    </table>
  </div>
  </div>
  <div class="container">
  <div class="file is-boxed is-centered is-large is-success">
      <label class="file-label">
      <input v-on:change="uploadFile" class="file-input" type="file" name="file" id="file">
      <span class="file-cta">
        <span class="file-icon">
          <i class="fas fa-cloud-upload-alt"></i>
        </span>
        <span class="file-label">
          Upload
        </span>
      </span>
      </label>
    </div>
    </div>
</section>
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex';
const axios = require('axios');

export default {
  data () {
    return {
      file: '',
    }
  },
  computed: {
    ...mapState(['fileData','auth']),
    ...mapGetters(['isAuth']),
  },
  methods: {
    ...mapActions(['getFiles','downloadFile']),
    downloadFileSubmit (fileId) {
      setTimeout(async () => {
        const file = async () => {
          return new Promise ((resolve,reject) => {
            const file = this.fileData.find(file => file.id == fileId);
            resolve(file.name);
          });
        };
        var promise = file();
        promise.then(async (result)=> {
          await this.downloadFile(result);
        })
      });
    },
    uploadFile () {
      var formData = new FormData();
      var imagefile = document.querySelector('#file');
      formData.append("file", imagefile.files[0]);
      try {
        setTimeout (async () => {
          axios.post('/api/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
        });
      }
      finally {
        setTimeout(async () => {
          await this.getFiles();
        });
      }
    },
  },
  mounted : function () {
    if (!this.fileData) {
          setTimeout(async () => {
            await this.getFiles();
          });
      }
  },
}
</script>

<style>
table {
  border-spacing: 1;
  border-collapse: collapse;
  background: white;
  border-radius: 6px;
  overflow: hidden;
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  position: relative;
}
table * {
  position: relative;
}
table td, table th {
  padding-left: 8px;
}
table thead tr {
  height: 60px;
  background: #FFED86;
  font-size: 16px;
}
table tbody tr {
  height: 48px;
  border-bottom: 1px solid #E3F1D5;
}
table tbody tr:last-child {
  border: 0;
}
table td, table th {
  text-align: left;
}
table td.l, table th.l {
  text-align: right;
}
table td.c, table th.c {
  text-align: center;
}
table td.r, table th.r {
  text-align: center;
}

@media screen and (max-width: 35.5em) {
  table {
    display: block;
  }
  table > *, table tr, table td, table th {
    display: block;
  }
  table thead {
    display: none;
  }
  table tbody tr {
    height: auto;
    padding: 8px 0;
  }
  table tbody tr td {
    padding-left: 45%;
    margin-bottom: 12px;
  }
  table tbody tr td:last-child {
    margin-bottom: 0;
  }
  table tbody tr td:before {
    position: absolute;
    font-weight: 700;
    width: 40%;
    left: 10px;
    top: 0;
  }
  table tbody tr td:nth-child(1):before {
    content: "Code";
  }
  table tbody tr td:nth-child(2):before {
    content: "Stock";
  }
  table tbody tr td:nth-child(3):before {
    content: "Cap";
  }
  table tbody tr td:nth-child(4):before {
    content: "Inch";
  }
  table tbody tr td:nth-child(5):before {
    content: "Box Type";
  }
}
body {
  background: #9BC86A;
  font: 400 14px 'Calibri','Arial';
  padding: 20px;
}
</style>