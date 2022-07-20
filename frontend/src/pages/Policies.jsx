import { Container, Card, Row, Text, Col, Spacer } from "@nextui-org/react";
import '../styles/Policies.css'


export default function Policies() {
    return (
        <Container className="mainContainerPolicies" lg>

            <Text className="titlePolicies" h1>Policies</Text>

            <Row gap={1}>
                <Col>
                    <Card className="cardPolicies">
                        <Card.Body>
                            <Text h6 size={15} color="white" className="subtitlePolicies">
                                About Us
                            </Text>
                            <Text className="textPolicies">
                                My Industrial Home is an innovative and attractive proposal to decorate your rooms and give them the elegance they deserve.
                                Powered by seven entrepreneurs, we started in 2022 with the dream of growing and exposing decoration online.Reaching homes with new products and styles, without giving up the motivation to innovate.
                                Stay here and learn more about us and your place decoration!
                            </Text>
                            <Text h6 size={15} color="white" className="subtitlePolicies">
                                About this Privacy policy
                            </Text>
                            <Text className="textPolicies">
                                We know how important it is for you to understand how we use your data. This Privacy Policy explains how we use any personal data you provide us with when you use our services in our stores, Online via our Website and the My Industrial Home App, through your My Industrial Home  Family membership, and any contact you have with our Customer Support Centre.
                                This Privacy Policy covers both private customers and business customers. We will always be transparent with you about what we do with your personal data. We only collect, store and process your personal data in accordance with the relevant laws and regulations.
                                This Privacy Policy also explains your rights in relation to the personal data that we collect about you. We respect your right to privacy and are committed to maintaining it. By accessing and browsing our website you are confirming that you have read and understood this Privacy Policy, so please make sure you have read it carefully.
                            </Text>
                            <Text h6 size={15} color="white" className="subtitlePolicies">
                                Your Rights
                            </Text>
                            <Text h4 className="secondSubtitlePolicies" css={{ padding: '10px' }}>
                                You have a number of rights relating to your personal data and what happens to it. You are entitled to:
                            </Text>
                            <Text>
                                <ul className="ulListPolicies">
                                    <li className='liPolicies'>Have your data processed in a fair, lawful and transparent way.</li>
                                    <li className='liPolicies'>Be informed about how your personal data is being used, an example being this privacy policy.</li>
                                    <li className='liPolicies'>Access personal data we hold about you.</li>
                                    <li className='liPolicies'>Require us to correct any mistakes in your personal data.</li>
                                    <li className='liPolicies'>Require us to delete personal data concerning you in certain situations where there is no good reason for us to continue to process it.</li>
                                    <li className='liPolicies'>Request that we transfer your personal data to you or another service provider in a simple, structured format.</li>
                                    <li className='liPolicies'>Object at any time to processing of your personal data for direct marketing purposes.</li>
                                    <li className='liPolicies'>Object to automated decision making which produces legal effects concerning you or similarly significantly affects you.</li>
                                    <li className='liPolicies'>Object in certain other situations to our continued processing of your personal data.</li>
                                    <li className='liPolicies'>Otherwise restrict or temporarily stop our processing of your personal data in certain circumstances.</li>
                                </ul>
                            </Text>
                            <Text h6 size={15} color="white" className="subtitlePolicies">
                                How do we use your personal data and what are our legal justifications for doing so?
                            </Text>
                            <Text h4 className="secondSubtitlePolicies" css={{ padding: '10px' }}>
                                There are a number of different reasons why we might use your personal data, depending on what type of data you have provided. You do not have to provide any of this personal data to us but if you don’t, we might not be able to make our products and services available to you, your overall shopping experience may be less personalised and it is less likely that you will receive our best overall customer experience.
                            </Text>
                            <Text>
                                <ol className="olListPolicies">
                                    <li className='liPolicies'>To fulfil your order, take payment from you i.e. taking payment, update you regarding the status of your order and shipping the order to you (including the printing of labels).
                                        Why we do it
                                        We rely on our contractual arrangements with you as the lawful basis on which we collect and process your personal data when you make an order for products and services.</li>
                                    <li className='liPolicies'>To manage any issues during order fulfilment. This would also include / click and collect / refunds / planning and measuring services and returns.
                                        Why we do it
                                        We've got to do this to perform our contract with you. We may also keep a record of this to comply with our legal obligations.</li>
                                    <li className='liPolicies'>To register you as an My Industrial Home registered customer for an My Industrial Home profile with us.
                                        Why we do it
                                        We've got to do this to perform our contract with you. If you have not yet purchased anything from us, we will ask you if you want to consent to email, SMS and direct mail marketing through this registration.</li>
                                    <li className='liPolicies'>To sign you up to receive our email Newsletters by submitting your details via our online form.
                                        Why we do it
                                        You consent to receive our email Newsletters if you chose to sign up by completing and submitting our online form. You can opt out of these at any time through your account settings.</li>
                                </ol>
                            </Text>
                            <Text h6 size={15} color="white" className="subtitlePolicies">
                                Security and retention of your personal data
                            </Text>
                            <Text h4 className="secondSubtitlePolicies" css={{ padding: '10px' }}>
                                Security of your personal data
                            </Text>
                            <Text className="textPolicies">
                                We take the security of your personal data very seriously. We have implemented various strategies, controls, policies and measures to keep your data secure and keep these measures under close review. We protect your data by using encryption techniques and we use other safeguards such as firewalls and password protection. This means that your data is protected and only accessible by co-workers who need it to carry out their job responsibilities. We also ensure that there are strict physical controls in our buildings which restricts access to your personal data to keep it safe.
                            </Text>
                            <Text h4 className="secondSubtitlePolicies" css={{ padding: '10px' }}>
                                Retention of your personal data
                            </Text>
                            <Text className="textPolicies">
                                In broad terms, we will only retain your personal data for as long as is necessary for the purposes described in this Privacy policy. This means that the retention periods will vary according to the type of the data and the reason that we have the data in the first place.
                                We have procedures in place regarding our retention periods which we keep under review taking into account our reasons for processing your personal data and the legal basis for doing so.
                            </Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
