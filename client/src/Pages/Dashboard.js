import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';      
import Form from 'react-bootstrap/Form';
 
export default function Dashboard () {
    const [show, setShow] = React.useState(false);
 
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
 
    return(
        <div className="text-center" style={{backgroundColor: '#dbe2ef', marginLeft: '0px'}}>
            <h5 style={{ marginLeft: '0px'}}>We'll have some info here</h5>
            <Button variant="outline-primary" onClick={handleShow}>Request a tutor</Button>
 
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>  
                <Modal.Title>Request a Tutor</Modal.Title>
                </Modal.Header>
                <Modal.Body>Select Skill: </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Submit
                </Button>
                </Modal.Footer>
            </Modal>
            
            <h6 style={{marginBottom: 2 + 'rem', marginTop: 4 + 'rem', marginLeft: '0px'}}>Tutors:</h6>
 
            <Card style={{ width: '50rem' , marginLeft: 'auto', marginRight: 'auto', marginBottom: '20px'}}>
                <Card.Img variant="left" src="holder.js/100px180?text=Image cap" />
                <Card.Body style={{paddingBottom: '.1rem'}}>
                    <Card.Title style={{position: "absolute"}}>Name</Card.Title>
                    <Card.Text style={{width: '60%', marginLeft: 'auto', marginRight: 'auto', position: 'relative', right: '2rem'}}>
                    Bio stuff. Lorem ipsum blah blah blah, etc. im bored. hows life? fine. thank u. did i mention i was bored?
                    <Button variant="outline-danger" href="profile" style={{ marginLeft: '.5rem'}}>Read more</Button>
                    </Card.Text>
                    <Button variant="primary" style={{position: 'relative', left: '300px', bottom: '50px'}} onClick={handleShow}>Connect</Button>
                    
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>  
                        <Modal.Title>Connect with tutor</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group>
                                    <Form.Label>Skill you need help with:</Form.Label>
                                    <Form.Control placeholder="Skill" />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Issue:</Form.Label>
                                    <Form.Control placeholder="Issue" />
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" type="submit" onClick={handleClose}>
                            Submit
                        </Button>
                        </Modal.Footer>
                    </Modal>
                </Card.Body>
            </Card>
            <Card style={{ width: '50rem' , marginLeft: 'auto', marginRight: 'auto', marginBottom: '20px'}}>
                <Card.Img variant="left" src="holder.js/100px180?text=Image cap" />
                <Card.Body style={{paddingBottom: '.1rem'}}>
                    <Card.Title style={{position: "absolute"}}>Name</Card.Title>
                    <Card.Text style={{width: '60%', marginLeft: 'auto', marginRight: 'auto', position: 'relative', right: '2rem'}}>
                    Bio stuff. Lorem ipsum blah blah blah, etc. im bored. hows life? fine. thank u. did i mention i was bored?
                    <Button variant="outline-danger" href="profile" style={{ marginLeft: '.5rem'}}>Read more</Button>
                    </Card.Text>
                    <Button variant="primary" style={{position: 'relative', left: '300px', bottom: '50px'}} onClick={handleShow}>Connect</Button>
                    
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>  
                        <Modal.Title>Connect with tutor</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group>
                                    <Form.Label>Skill you need help with:</Form.Label>
                                    <Form.Control placeholder="Skill" />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Issue:</Form.Label>
                                    <Form.Control placeholder="Issue" />
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" type="submit" onClick={handleClose}>
                            Submit
                        </Button>
                        </Modal.Footer>
                    </Modal>
                </Card.Body>
            </Card>
            <Card style={{ width: '50rem' , marginLeft: 'auto', marginRight: 'auto', marginBottom: '20px'}}>
                <Card.Img variant="left" src="holder.js/100px180?text=Image cap" />
                <Card.Body style={{paddingBottom: '.1rem'}}>
                    <Card.Title style={{position: "absolute"}}>Name</Card.Title>
                    <Card.Text style={{width: '60%', marginLeft: 'auto', marginRight: 'auto', position: 'relative', right: '2rem'}}>
                    Bio stuff. Lorem ipsum blah blah blah, etc. im bored. hows life? fine. thank u. did i mention i was bored?
                    <Button variant="outline-danger" href="profile" style={{ marginLeft: '.5rem'}}>Read more</Button>
                    </Card.Text>
                    <Button variant="primary" style={{position: 'relative', left: '300px', bottom: '50px'}} onClick={handleShow}>Connect</Button>
                    
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>  
                        <Modal.Title>Connect with tutor</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group>
                                    <Form.Label>Skill you need help with:</Form.Label>
                                    <Form.Control placeholder="Skill" />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Issue:</Form.Label>
                                    <Form.Control placeholder="Issue" />
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" type="submit" onClick={handleClose}>
                            Submit
                        </Button>
                        </Modal.Footer>
                    </Modal>
                </Card.Body>
            </Card>
            <Card style={{ width: '50rem' , marginLeft: 'auto', marginRight: 'auto', marginBottom: '20px'}}>
                <Card.Img variant="left" src="holder.js/100px180?text=Image cap" />
                <Card.Body style={{paddingBottom: '.1rem'}}>
                    <Card.Title style={{position: "absolute"}}>Name</Card.Title>
                    <Card.Text style={{width: '60%', marginLeft: 'auto', marginRight: 'auto', position: 'relative', right: '2rem'}}>
                    Bio stuff. Lorem ipsum blah blah blah, etc. im bored. hows life? fine. thank u. did i mention i was bored?
                    <Button variant="outline-danger" href="profile" style={{ marginLeft: '.5rem'}}>Read more</Button>
                    </Card.Text>
                    <Button variant="primary" style={{position: 'relative', left: '300px', bottom: '50px'}} onClick={handleShow}>Connect</Button>
                    
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>  
                        <Modal.Title>Connect with tutor</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group>
                                    <Form.Label>Skill you need help with:</Form.Label>
                                    <Form.Control placeholder="Skill" />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Issue:</Form.Label>
                                    <Form.Control placeholder="Issue" />
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" type="submit" onClick={handleClose}>
                            Submit
                        </Button>
                        </Modal.Footer>
                    </Modal>
                </Card.Body>
            </Card>
            <Card style={{ width: '50rem' , marginLeft: 'auto', marginRight: 'auto', marginBottom: '20px'}}>
                <Card.Img variant="left" src="holder.js/100px180?text=Image cap" />
                <Card.Body style={{paddingBottom: '.1rem'}}>
                    <Card.Title style={{position: "absolute"}}>Name</Card.Title>
                    <Card.Text style={{width: '60%', marginLeft: 'auto', marginRight: 'auto', position: 'relative', right: '2rem'}}>
                    Bio stuff. Lorem ipsum blah blah blah, etc. im bored. hows life? fine. thank u. did i mention i was bored?
                    <Button variant="outline-danger" href="profile" style={{ marginLeft: '.5rem'}}>Read more</Button>
                    </Card.Text>
                    <Button variant="primary" style={{position: 'relative', left: '300px', bottom: '50px'}} onClick={handleShow}>Connect</Button>
                    
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>  
                        <Modal.Title>Connect with tutor</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group>
                                    <Form.Label>Skill you need help with:</Form.Label>
                                    <Form.Control placeholder="Skill" />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Issue:</Form.Label>
                                    <Form.Control placeholder="Issue" />
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" type="submit" onClick={handleClose}>
                            Submit
                        </Button>
                        </Modal.Footer>
                    </Modal>
                </Card.Body>
            </Card>
        </div>
)}
 
 

