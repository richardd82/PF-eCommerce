const jwt = require("jsonwebtoken");
const CourierClient = require("@trycourier/courier").CourierClient;
const courier = CourierClient({
  authorizationToken: process.env.COURRIER_API_KEY,
});
const { URL_BACK,URL_FRONT } = process.env;

  const sendRegisterEmail = async (email, name, token) => {
  try {
    
    await courier.send({
        message: {
            to: {  
              email: email,
            },
            content: {
              version: "2022-01-01",
              title: "WELCOME TO ALIEN STREET",
              elements:[
                {
                  type:"text",
                  content:"Hi {{name}}, thank you for registering on our page, to activate your account click on the following button:  "
                },
                {
                  type:"action",
                  style:"link",
                  content:"Confirm your account",
                  href: "{{survey_link}}"
                }
              ]
              //body: ` Hi ${name}, thank you for registering on our page, to activate your account click on the following link: ${URL_BACK}/auth/confirm/${token}`,
            
            },
            data:{
              survey_link: `${URL_BACK}/auth/confirm/${token}`,
              email: email,
              name: name
            },
            routing: {
              method: "single",
              channels: ["email"],
            },
          },
      });
  } catch (error) {
    console.log(error)
  }

  }


  const forgotEmail = async (email, token) => {
    await courier.send({

      message: {
        to: {  
          email: email,
        },
        content: {
          version: "2022-01-01",
          title: "Recover your password",
          elements:[
            {
              type:"text",
              content:"To recover your password, click on the following button:  "
            },
            {
              type:"action",
              style:"link",
              content:"Recover password",
              href: "{{survey_link}}"
            }
          ]
        },
        data:{
          survey_link: `${URL_FRONT}/reset/${token}`,
          email: email,
        },
        routing: {
          method: "single",
          channels: ["email"],
        },
      },
  });  
  }

  const changeStateOrder = async (email, state, id) => {
    
        await courier.send({
          message: {
            to: {
              data: {
                name: "Forgot Email",
              },
              email: email,
            },
            content: { 
              title: `State order, id: ${id}` , 
              body: `Your order is in the status: ${state}`},
            routing: {
              method: "single",
              channels: ["email"],
            },
          },
        });
      
      }

      const createOrder = async (email, data) => {
       const stock = JSON.parse(data.stocks)
       const address = JSON.parse(data.contactAdress)


        await courier.send({
          message: {
            to: {
              data: {
                name: "Forgot Email",
              },
              email: email,
            },
            content: { 
              title: `State order, id:` , 
              body: ""},
            routing: {
              method: "single",
              channels: ["email"],
            },
          },
        });
      
      }


  module.exports = {
    sendRegisterEmail,
    forgotEmail,
    changeStateOrder,
    createOrder
  }