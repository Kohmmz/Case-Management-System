import os
from datetime import datetime, timezone
from Models import db, Advocate, Case, Client, Document  # Import your models
from app import create_app  # Import your Flask app

# Create the app and initialize the database context
app = create_app()

def seed_database():
    with app.app_context():
        # Drop and recreate tables (use cautiously in production)
        db.drop_all()
        db.create_all()

        # Create sample clients
        client1 = Client(
            name="John Doe", email="john.doe@example.com", phone="123456789",
            address="123 Street, City"
        )
        client2 = Client(
            name="Jane Smith", email="jane.smith@example.com", phone="987654321",
            address="456 Avenue, City"
        )
        # Add and commit clients to ensure their IDs are available
        db.session.add_all([client1, client2])
        db.session.commit()

        # Create sample advocates
        advocate1 = Advocate(
            username="advocate1", email="advocate1@example.com", first_name="Alice",
            last_name="Advocate", phone="555123456", role="advocate", specialization="Civil Law",
            bar_number="BAR12345", active=True
        )
        advocate1.set_password("password123")
        advocate2 = Advocate(
            username="advocate2", email="advocate2@example.com", first_name="Bob",
            last_name="Lawyer", phone="555987654", role="advocate", specialization="Criminal Law",
            bar_number="BAR67890", active=True
        )
        advocate2.set_password("password456")
        db.session.add_all([advocate1, advocate2])
        db.session.commit()

        # Create sample cases
        case1 = Case(
            title="Case Title A", case_number="CASE123", case_type="Civil", status="Open",
            filing_date=datetime(2023, 5, 1, tzinfo=timezone.utc),
            hearing_date=datetime(2023, 6, 1, tzinfo=timezone.utc),
            description="This is a sample civil case.",
            client_id=client1.id  # Use the committed client's ID
        )
        case2 = Case(
            title="Case Title B", case_number="CASE456", case_type="Criminal", status="Closed",
            filing_date=datetime(2022, 3, 10, tzinfo=timezone.utc),
            hearing_date=datetime(2022, 4, 15, tzinfo=timezone.utc),
            description="This is a sample criminal case.",
            client_id=client2.id  # Use the committed client's ID
        )
        db.session.add_all([case1, case2])
        db.session.commit()

        # Link advocates to cases
        case1.advocates.append(advocate1)
        case2.advocates.append(advocate2)

        # Create sample documents
        document1 = Document(
            case_id=case1.id, title="Contract Agreement", document_type="PDF",
            file_path="/files/contract_agreement.pdf", original_filename="contract.pdf",
            file_size=1024, mime_type="application/pdf",
            description="A signed contract agreement between parties.",
            filing_date=datetime(2023, 5, 5, tzinfo=timezone.utc), is_confidential=True,
            uploaded_by=advocate1.id
        )
        document2 = Document(
            case_id=case2.id, title="Witness Statement", document_type="Word Doc",
            file_path="/files/witness_statement.docx", original_filename="witness.docx",
            file_size=2048, mime_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            description="Statement from a witness.",
            filing_date=datetime(2022, 4, 10, tzinfo=timezone.utc), is_confidential=False,
            uploaded_by=advocate2.id
        )
        db.session.add_all([document1, document2])
        db.session.commit()

        print("Database successfully seeded!")

if __name__ == "__main__":
    seed_database()