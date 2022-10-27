import React from "react";
import "./about.css";
import logoLinkedIn from "../../assets/logoLinkedin.png";

var arregloDiv = [
  {
    div: "div1",
    img: "img card1",
    name: "Leandro",
    apellido: "Bustamente",
    twitter: "https://twitter.com/Lea_cloud",
    linkedin: "https://www.linkedin.com/in/leandro-ariel-bustamante-16351923a",
    gitHub: "https://github.com/Lean-182",
},
{
    div: "div2",
    img: "img card2",
    name: "Claudio",
    apellido: "Chumpitaz",
    twitter: "https://twitter.com/AngeloChumpita2",
    linkedin: "https://www.linkedin.com/in/claudio-angelo-chumpitaz-flores-29b069252/",
    gitHub: "https://github.com/XDRiderXtremeXD",
  },
  {
    div: "div3",
    img: "img card3",
    name: "Matias",
    apellido: "Mogica",
    twitter: "#",
    linkedin: "https://www.linkedin.com/in/matias-mogica-113295240/",
    gitHub: "https://github.com/matiasMogica",
  },
  {
    div: "div4",
    img: "img card4",
    name: "Ricardo Andrés ",
    apellido: "Díaz Bautista",
    twitter: "https://twitter.com/Richardd82_dev",
    linkedin: "https://www.linkedin.com/in/richardd82",
    gitHub: "https://github.com/richardd82",
  },
];

export default function About() {
  return (
<div>
    <div className="titleAbout titleCreate">
    <h1>Developers Team</h1>
</div>
    <main className="mainAbout">
      <div className={"parendAbout"}>
        {arregloDiv.map((elemento) => {
          return (
            <div className={"divCards"}>
              <div className={"cardAbout"}>
                <div className={"blob"}></div>
                <span className={elemento.img}></span>
                <h2>
                  {elemento.name}
                  <br />
                  <span>{elemento.apellido}</span>
                </h2>
                <p className="iconeZoneCard">
                  <a href={elemento.twitter} target="_blank">
                    <svg
                      height="35"
                      width="35"
                      xmlns="http://www.w3.org/2000/svg"
                      version="1.1"
                      viewBox="0 -0 1024 1024"
                      className="iconCard"
                    >
                      <path
                        d="M962.267429 233.179429q-38.253714 56.027429-92.598857 95.451429 0.585143 7.972571 0.585143 23.990857 0 74.313143-21.723429 148.260571t-65.974857 141.970286-105.398857 120.32-147.456 83.456-184.539429 31.158857q-154.843429 0-283.428571-82.870857 19.968 2.267429 44.544 2.267429 128.585143 0 229.156571-78.848-59.977143-1.170286-107.446857-36.864t-65.170286-91.136q18.870857 2.852571 34.889143 2.852571 24.576 0 48.566857-6.290286-64-13.165714-105.984-63.707429t-41.984-117.394286l0-2.267429q38.838857 21.723429 83.456 23.405714-37.741714-25.161143-59.977143-65.682286t-22.308571-87.990857q0-50.322286 25.161143-93.110857 69.12 85.138286 168.301714 136.265143t212.260571 56.832q-4.534857-21.723429-4.534857-42.276571 0-76.580571 53.979429-130.56t130.56-53.979429q80.018286 0 134.875429 58.294857 62.317714-11.995429 117.174857-44.544-21.138286 65.682286-81.115429 101.741714 53.174857-5.705143 106.276571-28.598857z"
                        fill="#f0f0f0"
                      ></path>
                    </svg>
                  </a>
                  <a
                    href={elemento.linkedin} target="_blank"
                  >
                    <svg
                      height="50"
                      width="40"
                      xmlns="http://www.w3.org/2000/svg"
                      version="1.1"
                      viewBox="0 -250 250 800"
                      className="iconCard iconLinkedIn"
                    >
                      <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path>
                    </svg>
                  </a>
                  <a href={elemento.gitHub} target="_blank">
                    <svg
                      height="35"
                      width="50"
                      xmlns="http://www.w3.org/2000/svg"
                      version="1.1"
                      viewBox="-90 0 1024 1024"
                      className="iconCard"
                    >
                      <path
                        d="M950.930286 512q0 143.433143-83.748571 257.974857t-216.283429 158.573714q-15.433143 2.852571-22.601143-4.022857t-7.168-17.115429l0-120.539429q0-55.442286-29.696-81.115429 32.548571-3.437714 58.587429-10.313143t53.686857-22.308571 46.299429-38.034286 30.281143-59.977143 11.702857-86.016q0-69.12-45.129143-117.686857 21.138286-52.004571-4.534857-116.589714-16.018286-5.12-46.299429 6.290286t-52.589714 25.161143l-21.723429 13.677714q-53.174857-14.848-109.714286-14.848t-109.714286 14.848q-9.142857-6.290286-24.283429-15.433143t-47.689143-22.016-49.152-7.68q-25.161143 64.585143-4.022857 116.589714-45.129143 48.566857-45.129143 117.686857 0 48.566857 11.702857 85.723429t29.988571 59.977143 46.006857 38.253714 53.686857 22.308571 58.587429 10.313143q-22.820571 20.553143-28.013714 58.88-11.995429 5.705143-25.746286 8.557714t-32.548571 2.852571-37.449143-12.288-31.744-35.693714q-10.825143-18.285714-27.721143-29.696t-28.306286-13.677714l-11.410286-1.682286q-11.995429 0-16.603429 2.56t-2.852571 6.582857 5.12 7.972571 7.460571 6.875429l4.022857 2.852571q12.580571 5.705143 24.868571 21.723429t17.993143 29.110857l5.705143 13.165714q7.460571 21.723429 25.161143 35.108571t38.253714 17.115429 39.716571 4.022857 31.744-1.974857l13.165714-2.267429q0 21.723429 0.292571 50.834286t0.292571 30.866286q0 10.313143-7.460571 17.115429t-22.820571 4.022857q-132.534857-44.032-216.283429-158.573714t-83.748571-257.974857q0-119.442286 58.88-220.306286t159.744-159.744 220.306286-58.88 220.306286 58.88 159.744 159.744 58.88 220.306286z"
                        fill="#f0f0f0"
                      ></path>
                    </svg>
                  </a>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </main>
    </div>
  );
}

{
  /* <path d="M123.52064 667.99143l344.526782 229.708899 0-205.136409-190.802457-127.396658zM88.051421 585.717469l110.283674-73.717469-110.283674-73.717469 0 147.434938zM556.025711 897.627196l344.526782-229.708899-153.724325-102.824168-190.802457 127.396658 0 205.136409zM512 615.994287l155.406371-103.994287-155.406371-103.994287-155.406371 103.994287zM277.171833 458.832738l190.802457-127.396658 0-205.136409-344.526782 229.708899zM825.664905 512l110.283674 73.717469 0-147.434938zM746.828167 458.832738l153.724325-102.824168-344.526782-229.708899 0 205.136409zM1023.926868 356.00857l0 311.98286q0 23.402371-19.453221 36.566205l-467.901157 311.98286q-11.993715 7.459506-24.57249 7.459506t-24.57249-7.459506l-467.901157-311.98286q-19.453221-13.163834-19.453221-36.566205l0-311.98286q0-23.402371 19.453221-36.566205l467.901157-311.98286q11.993715-7.459506 24.57249-7.459506t24.57249 7.459506l467.901157 311.98286q19.453221 13.163834 19.453221 36.566205z" fill="#f0f0f0"></path> */
}
