import DiagramTab from '../components/DiagramTab';
import Container from '../components/UI/Container';

function DiagramPage() {
  return (
    <Container>
      <div style={{ backgroundColor: 'grey' }}>
        <h2>Diagram Page</h2>
        <DiagramTab />
      </div>
    </Container>
  );
}

export default DiagramPage;
