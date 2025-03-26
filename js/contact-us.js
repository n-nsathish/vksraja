// import firebase from 'firebase'


// const sendMailOverHTTP = firebase.functions.httpsCallable('sendMailOverHTTP')


new Vue({
  el: '#q-contact-us',
  data: function () {
    return {
      showContactSentModal: false,
      fullName: '',
      mobileNumber: '',
      email: '',
      userLocation: '',
      currentTopic: null,
      message: '',
      topicSelected: null,
      topics: {
        one: "Where to buy a Medicine",
        two: "How to consume a Medicine",
        three: "Medicine Requirements",
        four: "Doctor Consultation",
        five: "Queries",
        six: "Others",
      },
    }
  },
  mounted() {
    reInitWebflow()
    initFirebase()
    this.checkHamburger()

  },
  watch: {
    topicSelected(value) {
      if (value) {
        this.currentTopic = this.topics[value]
      } else {
        this.currentTopic = null
      }

    },
  },
  methods: {
    checkHamburger() {
      let ham = document.getElementsByClassName('hamburger-lottie')[0]
      if (ham.childNodes[0]) {
        ham.removeChild(ham.childNodes[0]);
      }

    },
    async scrollToTop() {
      setTimeout(() => {

        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }, 10);

    },
    resetAll() {
      this.fullName = '';
      this.mobileNumber = '';
      this.email = '';
      this.userLocation = '';
      this.message = '';
      this.topicSelected = null;
    },
    validateForm() {
      if (this.fullName.length < 2) {
        this.$q.dialog({
          title: 'Full Name',
          message: 'Please enter a valid name'
        })
        return false;
      }
      if (this.mobileNumber.length < 10) {
        this.$q.dialog({
          title: 'Mobile Number',
          message: 'Enter a valid mobile number'
        })
        return false;
      }
      if (this.mobileNumber.length === 11 && !this.mobileNumber.startsWith('0')) {
        this.$q.dialog({
          title: 'Mobile Number',
          message: 'Please enter a valid mobile number'
        })
        return false;
      }
      if (this.mobileNumber.length === 13 && !this.mobileNumber.startsWith('+')) {
        this.$q.dialog({
          title: 'Mobile Number',
          message: 'Please enter a valid mobile number'
        })
        return false;
      }
      if (!validateEmail(this.email)) {
        this.$q.dialog({
          title: 'Email',
          message: 'Enter a valid email'
        })
        return false;
      }
      if (!this.currentTopic) {
        this.$q.dialog({
          title: 'Topic',
          message: 'Please select a topic'
        })
        return false;
      }
      if (this.message.length < 10) {
        this.$q.dialog({
          title: 'Address',
          message: 'Please enter a message with minimum 10 characters'
        })
        return false;
      }
      return true;
    },
    sendMessage() {


      if (!this.validateForm()) return;

      var subject = `Enquiry from ${this.email}`;
      let toEmail = VENDOR_EMAIL;
      let fromEmail = `Cloud Cerebro <cloudcerebro.dev.09.2020@gmail.com>`;



      var body = `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
      <html>
      
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <title></title>
        <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700" rel="stylesheet">
        <style type="text/css">
          html {
            -webkit-text-size-adjust: none;
            -ms-text-size-adjust: none;
            background: #f3f3f3;
      
          }
      
          @media only screen and (min-device-width: 650px) {
            .table650 {
              width: 650px !important;
            }
          }
      
          @media only screen and (max-device-width: 650px),
          only screen and (max-width: 650px) {
            table .table650 {
              width: 100% !important;
            }
      
            .mob_b {
              width: 93% !important;
              max-width: 93% !important;
              min-width: 93% !important;
            }
      
            .mob_b1 {
              width: 100% !important;
              max-width: 100% !important;
              min-width: 100% !important;
            }
      
            .mob_left {
              text-align: left !important;
            }
      
            .mob_center {
              text-align: center !important;
            }
      
            .mob_soc {
              width: 50% !important;
              max-width: 50% !important;
              min-width: 50% !important;
            }
      
            .mob_menu {
              width: 50% !important;
              max-width: 50% !important;
              min-width: 50% !important;
      
            }
      
            .mob_pad {
              width: 15px !important;
              max-width: 15px !important;
              min-width: 15px !important;
            }
      
            .min_pad2 {
              height: 30px !important;
              max-height: 30px !important;
              min-height: 15px !important;
            }
      
            .top_pad {
              height: 15px !important;
              max-height: 15px !important;
              min-height: 15px !important;
            }
      
            .top_pad2 {
              height: 50px !important;
              max-height: 50px !important;
              min-height: 50px !important;
            }
      
            .mob_title1 {
              font-size: 36px !important;
              line-height: 40px !important;
            }
      
            .mob_title2 {
              font-size: 26px !important;
              line-height: 33px !important;
            }
      
            .mob_txt {
              font-size: 20px !important;
              line-height: 25px !important;
            }
          }
      
          @media only screen and (max-device-width: 550px),
          only screen and (max-width: 550px) {
            .mod_div {
              display: block !important;
            }
      
            .mob_btn {
              width: 100% !important;
              max-width: 100% !important;
              min-width: 100% !important;
            }
          }
      
          .table650 {
            width: 650px;
          }
        </style>
      </head>
      
      <body style="margin: 0; padding: 0;">
        <table cellpadding="0" cellspacing="0" border="0" width="100%"
          style="background: #f3f3f3; min-width: 340px; font-size: 1px; line-height: normal;">
          <tr>
            <td align="center" valign="top">
              <!--[if (gte mso 9)|(IE)]>
               <table border="0" cellspacing="0" cellpadding="0">
               <tr><td align="center" valign="top" width="650"><![endif]-->
      
              <table cellpadding="0" cellspacing="0" border="0" width="650" class="table650"
                style="width: 100%; max-width: 650px; min-width: 340px; background: #f3f3f3;">
                <tr>
                  <td class="mob_pad" width="25" style="width: 25px; max-width: 25px; min-width: 25px;">&nbsp;</td>
                  <td align="center" valign="top" style="background: #ffffff;">
                    <table cellpadding="0" cellspacing="0" border="0" width="100%"
                      style="width: 100% !important; min-width: 100%; max-width: 100%; background: #f3f3f3;">
                      <tr>
                        <td align="right" valign="top">
                          <div class="top_pad" style="height: 25px; line-height: 25px; font-size: 23px;">&nbsp;</div>
                        </td>
                      </tr>
                    </table>
                    <table cellpadding="0" cellspacing="0" border="0" width="90%"
                      style="width: 90% !important; min-width: 90%; max-width: 90%;">
                      <tr>
                        <td align="center" valign="top">
                          <div style="height: 40px; line-height: 40px; font-size: 38px;">&nbsp;</div>
                          <span
                            style="font-family: 'Source Sans Pro', Arial, Tahoma, Geneva, sans-serif;font-size:32px; color:#ff0000; text-decoration-line: none;font-weight: 700;">VKS
                            Raja Sidhaa Marundagam</span>
      
                          <div class="top_pad2" style="height: 48px; line-height: 48px; font-size: 58px;">&nbsp;</div>
                        </td>
                      </tr>
                    </table>
                    <table cellpadding="0" cellspacing="0" border="0" width="80%"
                      style="width: 80% !important; min-width: 80%; max-width: 80%;">
                      <tr>
                        <td align="center" valign="top" class="mob_title1"
                          style="font-family: 'Source Sans Pro', Arial, Tahoma, Geneva, sans-serif; color: #333333; font-size: 22px; font-weight: 400;">
                          Message from ${this.fullName}<div style="height: 20px;">&nbsp;</div>
                        </td>
                      </tr>
                      <tr>
                        <td align="center" valign="top"
                          style="font-family: 'Source Sans Pro', Arial, Tahoma, Geneva, sans-serif; color: #666666; font-size: 18px;">
      
                          Topic : ${this.currentTopic}. <br>
      
                        </td>
                      </tr>
                      <tr>
                        <td align="right" valign="top">
                          <div class="top_pad" style="height: 25px; line-height: 25px; font-size: 23px;">&nbsp;</div>
                        </td>
                      </tr>
                      <tr>
                        <td align="center" valign="top"
                          style="font-family: 'Source Sans Pro', Arial, Tahoma, Geneva, sans-serif; color: #666666; font-size: 18px;">
      
                          ${this.message.replaceAll('\n', '<br>')} <br>
      
                        </td>
                      </tr>
                      <tr>
                        <td align="center" valign="top">
      
                          <div class="min_pad2" style="height: 40px; line-height: 40px; font-size: 38px;">&nbsp;</div>
                        </td>
                      </tr>
                      <tr>
                        <td align="left" valign="top"
                          style="font-family: 'Source Sans Pro', Arial, Tahoma, Geneva, sans-serif; color: #999999; font-size: 14px; background-color: e6e6e6">
                          <div style="height: 20px; line-height: 20px; font-size: 14px; border-top: #CCCCCC 1px solid">&nbsp;
                          </div>
                          <span style="font-size: 18px;line-height: 28px; color: black;">From,</span><br>
                          <span style="font-size: 18px;line-height: 28px; color: black;">${this.fullName}</span><br>
                          <span style="font-size: 15px;">${this.userLocation}</span><br>
                          <span style="font-size: 15px;">${this.email}</span><br>
                          <span style="font-size: 15px;">${this.mobileNumber}</span>
      
                          </span>
                          <div style="height: 50px; line-height: 50px; font-size: 48px;">&nbsp;</div>
                        </td>
                      </tr>
                    </table>
      
                    <table cellpadding="0" cellspacing="0" border="0" width="100%"
                      style="width: 100% !important; min-width: 100%; max-width: 100%; background: #f3f3f3;">
                      <tr>
                        <td align="center" valign="top">
                          <table cellpadding="0" cellspacing="0" border="0" width="100%"
                            style="width: 100% !important; min-width: 100%; max-width: 100%; background: #f3f3f3;">
                            <tr>
                              <td align="center" valign="top">
                                <div style="height: 34px;">&nbsp;</div>
      
                                <div style="height: 20px;">&nbsp;</div>
                                <font face="'Source Sans Pro', sans-serif" color="black"
                                  style="font-size: 14px;line-height: 22px; "> © 2021 VKS Raja Sidhaa Marundagam</font>
                                <div style="height: 17px;">&nbsp;</div>
      
                                <div style="height: 34px;">&nbsp;</div>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
            <td class="mob_pad" width="25" style="width: 25px; max-width: 25px; min-width: 25px;">&nbsp;</td>
          </tr>
        </table>
      
        <!--[if (gte mso 9)|(IE)]>
               </td></tr>
               </table><![endif]-->
        </td>
        </tr>
        </table>
      </body>
      
      </html>`

      let mail = {
        fromEmail: fromEmail,
        toEmail: toEmail,
        subject: subject,
        body: body
      };

      this.$q.loading.show({
        spinnerColor: 'red-10',
        backgroundColor: 'pink-2',
        message: 'Sending message...',
        messageColor: 'black'
      })

      sendMailOverHTTP(mail)
        .then(result => {
          this.$q.loading.hide()

          this.showContactSentModal = true
          this.resetAll()
        })
        .catch(err => {
          this.$q.loading.hide()

          this.$q.dialog({
            title: 'Server busy',
            message: 'Please try again later'
          })
        })





    },
    closeContactSentModal() {
      this.showContactSentModal = false
      this.scrollToTop()
    },

  },
  // ...etc
})