import React, { useEffect, useState } from "react";
import BaseLayout from "../components/BaseLayout";
import Image from "next/image";
import { BsGithub, BsInstagram, BsLinkedin } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import {
  ReactCompareSlider,
  ReactCompareSliderHandle,
  ReactCompareSliderImage,
} from "react-compare-slider";
import ReactLoading from "react-loading";

const Home: React.FC = () => {
  const isClient = typeof window !== "undefined"; // Check if running on the client side

  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isClient) {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      setIsLoading(false);

      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [isClient]);

  return (
    <BaseLayout>
      <div className="home">
        {isLoading ? (
          <div className="loadingBar">
            <ReactLoading
              type="bars"
              color="#7fc7d9"
              height={450}
              width={375}
            />
          </div>
        ) : (
          <div>
            {windowSize.width <= 1000 ? (
              <div
                style={
                  {
                    display: "flex",
                    alignContent: "center",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  } as React.CSSProperties
                }
              >
                <div>
                  <ReactCompareSlider
                    className="avatarSmallScreen"
                    changePositionOnHover={true}
                    position={48}
                    itemOne={
                      <ReactCompareSliderImage
                        src="/ai_avatar.png"
                        alt="Image one"
                        width={140}
                        height={140}
                      />
                    }
                    itemTwo={
                      <ReactCompareSliderImage
                        src="/real_avatar.png"
                        alt="Image two"
                        width={140}
                        height={140}
                      />
                    }
                    handle={
                      <ReactCompareSliderHandle
                        buttonStyle={{
                          backdropFilter: undefined,
                          background: "transparent",
                          border: 0,
                          color: "transparent",
                          width: "0px",
                        }}
                        linesStyle={{
                          backdropFilter: undefined,
                          background: "transparent",
                          color: "transparent",
                          width: "0px",
                          border: 0,
                        }}
                      />
                    }
                  />
                  <div
                    style={
                      {
                        display: "flex",
                        alignContent: "center",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "row",
                        marginTop: "15px",
                      } as React.CSSProperties
                    }
                  >
                    {
                      <BsGithub
                        size={30}
                        style={
                          {
                            marginRight: "15px",
                            marginLeft: "15px",
                          } as React.CSSProperties
                        }
                      />
                    }
                    {
                      <BsInstagram
                        size={30}
                        style={
                          {
                            marginRight: "15px",
                          } as React.CSSProperties
                        }
                      />
                    }
                    {
                      <BsLinkedin
                        size={30}
                        style={{ marginRight: "15px" } as React.CSSProperties}
                      />
                    }
                  </div>
                </div>
              </div>
            ) : null}
            <div
              style={
                {
                  display: "flex",
                } as React.CSSProperties
              }
            >
              <div>
                <h1
                  className="name"
                  style={
                    {
                      textAlign: windowSize.width <= 1000 ? "center" : "start",
                      marginBottom: "15px",
                    } as React.CSSProperties
                  }
                >
                  Raka Ramadhani Aulia Prasetyo
                </h1>
                <p
                  style={
                    {
                      fontSize: "medium",
                      textAlign: windowSize.width <= 1000 ? "justify" : "start",
                      color: "#545454",
                    } as React.CSSProperties
                  }
                >
                  Hey there, tech aficionados and digital wanderers! I&apos;m
                  Raka, charting my course through the captivating realms of
                  technology and innovation, all while calling the lively city
                  of Balikpapan in East Kalimantan, Indonesia, my home base.
                  Strapping in with an Electrical Engineering major from the
                  vibrant halls of Universitas Balikpapan, my heartbeat syncs
                  with the beats of Artificial Intelligence, Mobile Development,
                  and Web Development. Slide into my tech playground, where I
                  groove with Flutter and React Native for Mobile Development,
                  and dance through the digital spaces with ReactJS and NextJS
                  for Web Development. HTML and CSS are my trusty sidekicks,
                  always ready to set the stage. But hey, I&apos;m not just a
                  digital maestro – I&apos;ve got my hands dirty (with pixels,
                  of course!) in the world of 3D printing. When I&apos;m not
                  coding up a storm, catch me crafting 3D printed electrical
                  tools as my not-so-secret hobby. This website is more than
                  just pixels on a screen; it&apos;s a peek into my journey
                  through circuits, code, and creativity. So, buckle up and join
                  the ride – let&apos;s explore the funkier side of tech
                  together!
                </p>
                <p
                  style={
                    {
                      marginTop: "10px",
                      marginBottom: "10px",
                      fontWeight: "bolder",
                      textAlign: windowSize.width <= 1000 ? "center" : "start",
                    } as React.CSSProperties
                  }
                >
                  My Specialty
                </p>
                <div
                  style={
                    {
                      display: "flex",
                      alignContent: "center",
                      justifyContent:
                        windowSize.width <= 1000 ? "center" : "start",
                      alignItems: "center",
                      flexDirection: "row",
                    } as React.CSSProperties
                  }
                >
                  <div className="skillLogo">
                    <Image
                      width={30}
                      height={30}
                      src="/dart_logo.png"
                      alt="dart"
                    />
                  </div>
                  <div className="skillLogo">
                    <Image
                      width={30}
                      height={30}
                      src="/typescript_logo.png"
                      alt="typescript"
                    />
                  </div>
                  <div className="skillLogo">
                    <Image
                      width={30}
                      height={30}
                      src="/python_logo.png"
                      alt="python"
                    />
                  </div>
                  <div className="skillLogo">
                    <Image width={30} height={30} src="/go_logo.png" alt="go" />
                  </div>
                  <div className="skillLogo">
                    <Image
                      width={30}
                      height={30}
                      src="/arduino_logo.png"
                      alt="arduino"
                    />
                  </div>
                </div>
              </div>

              {windowSize.width <= 1000 ? null : (
                <div>
                  <ReactCompareSlider
                    className="avatar"
                    style={{ marginLeft: "60px" } as React.CSSProperties}
                    changePositionOnHover={true}
                    position={48}
                    itemOne={
                      <ReactCompareSliderImage
                        src="/ai_avatar.png"
                        alt="Image one"
                        width={140}
                        height={140}
                      />
                    }
                    itemTwo={
                      <ReactCompareSliderImage
                        src="/real_avatar.png"
                        alt="Image two"
                        width={140}
                        height={140}
                      />
                    }
                    handle={
                      <ReactCompareSliderHandle
                        buttonStyle={{
                          backdropFilter: undefined,
                          background: "transparent",
                          border: 0,
                          color: "transparent",
                          width: "0px",
                        }}
                        linesStyle={{
                          backdropFilter: undefined,
                          background: "transparent",
                          color: "transparent",
                          width: "0px",
                          border: 0,
                        }}
                      />
                    }
                  />

                  <div
                    style={
                      {
                        display: "flex",
                        alignContent: "center",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "row",
                        marginTop: "15px",
                      } as React.CSSProperties
                    }
                  >
                    <a
                      href="https://github.com/raka-raprast"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <BsGithub
                        size={30}
                        style={
                          {
                            marginRight: "15px",
                            marginLeft: "45px",
                            color: "black",
                          } as React.CSSProperties
                        }
                      />
                    </a>
                    <a
                      href="https://www.instagram.com/raka.raprast/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <BsInstagram
                        size={30}
                        style={
                          {
                            marginRight: "15px",
                            color: "black",
                          } as React.CSSProperties
                        }
                      />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/raka-raprast/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <BsLinkedin
                        size={30}
                        style={
                          {
                            marginRight: "15px",
                            color: "black",
                          } as React.CSSProperties
                        }
                      />
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="footer">© 2024 Raka Ramadhani Aulia Prasetyo</div>
    </BaseLayout>
  );
};

export default Home;
