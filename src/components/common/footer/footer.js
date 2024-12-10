import React from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBCol,
  MDBRow,
  MDBBtn,
} from "mdb-react-ui-kit";
import "./footer.css";

export const Footer = () => {
  return (
    <MDBFooter className="text-center" color="white" bgColor="dark">
      <MDBContainer className="p-3">
        <section className="mb-4">
          <MDBBtn
            outline
            color="light"
            floating
            className="m-2"
            href="#!"
            role="button"
          >
            <MDBIcon fab icon="facebook-f" />
          </MDBBtn>

          <MDBBtn
            outline
            color="light"
            floating
            className="m-2"
            href="https://twitter.com/"
            role="button"
          >
            <MDBIcon fab icon="twitter" />
          </MDBBtn>

          <MDBBtn
            outline
            color="light"
            floating
            className="m-2"
            href="#!"
            role="button"
          >
            <MDBIcon fab icon="google" />
          </MDBBtn>


          <MDBBtn
            outline
            color="light"
            floating
            className="m-2 "
            href="https://www.instagram.com/"
            role="button"
          >
            <MDBIcon fab icon="instagram" />
          </MDBBtn>
        </section>

        <section className="">
          <form action="">
            <MDBRow className="d-flex justify-content-center">
              <MDBCol size="auto"  >
                <p className="pt-2">
                  <strong>Sign up for our newsletter</strong>
                </p>
              </MDBCol>

              <MDBCol md="5" start>
                <MDBInput
                  contrast
                  type="email"
                  label="Email address"
                  className="mb-4"
                />
              </MDBCol>

              <MDBCol size="auto">
                <MDBBtn outline color="light" type="submit" className="mb-4">
                  Subscribe
                </MDBBtn>
              </MDBCol>
            </MDBRow>
          </form>
        </section>

        <section className="mb-4">
          <p>
            Food Panda is an an Indian multinational restaurant aggregator and
            food delivery company.It serves around 20+ countries and covers
            5000+ cities. It is the world's largest food delivery company.It serves Indian,Itanlian,Chinese,Thai and many more dishes.
          </p>
        </section>
      </MDBContainer>

      <div
        className="text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)"}}
      >
        © 2023 Copyright: 
        <a className="text-white" href="#!">
          FoodPanda.Inc
        </a>
      </div>
    </MDBFooter>
  );
};
