// Medical options based on doctor specialization with symptom-based suggestions

export interface SymptomMapping {
  diagnosis: string[];
  treatment: string[];
  labTests: string[];
  prescription: string[];
}

// Orthopedic symptom-based suggestions
export const orthopedicSymptomMappings: Record<string, SymptomMapping> = {
  "Joint pain": {
    diagnosis: ["Osteoarthritis", "Rheumatoid arthritis"],
    treatment: ["Pain management", "Physical therapy", "Rest and ice therapy"],
    labTests: ["X-ray of affected joint", "ESR", "CRP", "RA Factor"],
    prescription: ["Tab. Diclofenac 50mg 1-0-1 x 7 days", "Cap. Omeprazole 20mg 1-0-0 x 7 days", "Gel Diclofenac apply locally BD"]
  },
  "Back pain": {
    diagnosis: ["Lumbar spondylosis", "Disc herniation", "Muscle strain"],
    treatment: ["Rest and ice therapy", "Physical therapy", "Pain management"],
    labTests: ["X-ray Lumbar spine AP/Lateral", "MRI Lumbar spine"],
    prescription: ["Tab. Diclofenac 50mg 1-0-1 x 7 days", "Tab. Thiocolchicoside 4mg 1-0-1 x 5 days", "Cap. Omeprazole 20mg 1-0-0 x 7 days"]
  },
  "Knee pain": {
    diagnosis: ["Osteoarthritis knee", "Meniscus tear", "Ligament injury"],
    treatment: ["Physical therapy", "Bracing/Splinting", "Rest and ice therapy"],
    labTests: ["X-ray Knee AP/Lateral", "MRI Knee"],
    prescription: ["Tab. Diclofenac 50mg 1-0-1 x 7 days", "Tab. Calcium + Vit D3 1-0-0 x 30 days", "Gel Diclofenac apply locally BD"]
  },
  "Shoulder pain": {
    diagnosis: ["Frozen shoulder", "Rotator cuff injury", "Tendinitis"],
    treatment: ["Physical therapy", "Steroid injection", "Exercise therapy"],
    labTests: ["X-ray Shoulder AP/Lateral", "MRI Shoulder"],
    prescription: ["Tab. Aceclofenac 100mg 1-0-1 x 5 days", "Cap. Omeprazole 20mg 1-0-0 x 7 days", "Gel Diclofenac apply locally BD"]
  },
  "Hip pain": {
    diagnosis: ["Osteoarthritis hip", "Avascular necrosis", "Bursitis"],
    treatment: ["Pain management", "Physical therapy", "Weight management"],
    labTests: ["X-ray Hip AP/Lateral", "MRI Hip"],
    prescription: ["Tab. Etoricoxib 60mg 0-0-1 x 5 days", "Tab. Calcium + Vit D3 1-0-0 x 30 days"]
  },
  "Neck pain": {
    diagnosis: ["Cervical spondylosis", "Cervical disc herniation", "Muscle strain"],
    treatment: ["Physical therapy", "Bracing/Splinting", "Hot/Cold compress"],
    labTests: ["X-ray Cervical spine AP/Lateral", "MRI Cervical spine"],
    prescription: ["Tab. Diclofenac 50mg 1-0-1 x 7 days", "Tab. Thiocolchicoside 4mg 1-0-1 x 5 days", "Tab. Methycobal 500mcg 1-0-1 x 15 days"]
  },
  "Swelling in joints": {
    diagnosis: ["Rheumatoid arthritis", "Gout", "Septic arthritis"],
    treatment: ["Rest and ice therapy", "Pain management"],
    labTests: ["ESR", "CRP", "RA Factor", "Uric acid", "CBC"],
    prescription: ["Tab. Ibuprofen 400mg 1-0-1 x 5 days", "Cap. Omeprazole 20mg 1-0-0 x 7 days"]
  },
  "Stiffness": {
    diagnosis: ["Osteoarthritis", "Ankylosing spondylitis", "Rheumatoid arthritis"],
    treatment: ["Physical therapy", "Exercise therapy", "Hot/Cold compress"],
    labTests: ["X-ray of affected area", "ESR", "CRP", "HLA-B27"],
    prescription: ["Tab. Aceclofenac 100mg 1-0-1 x 5 days", "Tab. Calcium + Vit D3 1-0-0 x 30 days"]
  },
  "Muscle weakness": {
    diagnosis: ["Myopathy", "Nerve compression", "Vitamin D deficiency"],
    treatment: ["Physical therapy", "Exercise therapy"],
    labTests: ["Vitamin D levels", "CPK", "EMG/NCV"],
    prescription: ["Tab. Calcium + Vit D3 1-0-0 x 30 days", "Tab. Methycobal 500mcg 1-0-1 x 15 days"]
  },
  "Difficulty walking": {
    diagnosis: ["Osteoarthritis knee/hip", "Sciatica", "Spinal stenosis"],
    treatment: ["Physical therapy", "Pain management", "Bracing/Splinting"],
    labTests: ["X-ray Spine/Hip/Knee", "MRI if needed"],
    prescription: ["Tab. Pregabalin 75mg 0-0-1 x 7 days", "Tab. Methycobal 500mcg 1-0-1 x 15 days"]
  },
  "Fracture/Injury": {
    diagnosis: ["Fracture", "Soft tissue injury", "Dislocation"],
    treatment: ["Joint immobilization", "Surgical intervention required"],
    labTests: ["X-ray of affected area", "CT scan if complex fracture"],
    prescription: ["Tab. Paracetamol 500mg 1-0-1 x 5 days", "Tab. Calcium + Vit D3 1-0-0 x 30 days", "Cap. Omeprazole 20mg 1-0-0 x 7 days"]
  },
  "Sports injury": {
    diagnosis: ["Ligament tear", "Meniscus tear", "Muscle strain", "Tendinitis"],
    treatment: ["Rest and ice therapy", "Physical therapy", "Bracing/Splinting"],
    labTests: ["X-ray of affected area", "MRI if needed"],
    prescription: ["Tab. Diclofenac 50mg 1-0-1 x 7 days", "Gel Diclofenac apply locally BD", "Tab. Thiocolchicoside 4mg 1-0-1 x 5 days"]
  },
  "Numbness/Tingling": {
    diagnosis: ["Carpal tunnel syndrome", "Cervical radiculopathy", "Peripheral neuropathy"],
    treatment: ["Physical therapy", "Bracing/Splinting"],
    labTests: ["EMG/NCV", "Vitamin B12 levels", "Thyroid profile"],
    prescription: ["Tab. Pregabalin 75mg 0-0-1 x 7 days", "Tab. Methycobal 500mcg 1-0-1 x 15 days"]
  }
};

// Pediatric symptom-based suggestions
export const pediatricSymptomMappings: Record<string, SymptomMapping> = {
  "Fever": {
    diagnosis: ["Viral fever", "Upper respiratory infection", "Urinary tract infection"],
    treatment: ["Antipyretics", "Hydration therapy", "Symptomatic treatment"],
    labTests: ["CBC", "Urine routine", "Malarial antigen (if high fever)"],
    prescription: ["Syp. Paracetamol 5ml SOS for fever", "Syp. Calpol Plus 5ml SOS for fever"]
  },
  "Cough": {
    diagnosis: ["Upper respiratory infection", "Bronchitis", "Allergic rhinitis"],
    treatment: ["Symptomatic treatment", "Nebulization"],
    labTests: ["CBC", "Chest X-ray (if persistent)"],
    prescription: ["Syp. Ambroxol 2.5ml 1-1-1 x 5 days", "Syp. Cetirizine 2.5ml 0-0-1 x 5 days"]
  },
  "Cold/Runny nose": {
    diagnosis: ["Common cold", "Allergic rhinitis", "Sinusitis"],
    treatment: ["Symptomatic treatment", "Steam inhalation"],
    labTests: ["No tests required usually"],
    prescription: ["Drops Nasivion 2 drops each nostril BD x 3 days", "Syp. Cetirizine 2.5ml 0-0-1 x 5 days"]
  },
  "Vomiting": {
    diagnosis: ["Acute gastroenteritis", "Food poisoning", "Viral infection"],
    treatment: ["ORS and zinc supplementation", "Hydration therapy", "Dietary modification"],
    labTests: ["Stool routine", "CBC"],
    prescription: ["Syp. Ondem 2ml SOS for vomiting", "ORS 1 packet in 1L water after each episode"]
  },
  "Diarrhea": {
    diagnosis: ["Acute gastroenteritis", "Viral diarrhea", "Food intolerance"],
    treatment: ["ORS and zinc supplementation", "Hydration therapy", "Dietary modification"],
    labTests: ["Stool routine", "Stool culture (if severe)"],
    prescription: ["ORS 1 packet in 1L water after each loose stool", "Syp. Zinc 5ml 1-0-0 x 14 days"]
  },
  "Stomach pain": {
    diagnosis: ["Acute gastritis", "Worm infestation", "Constipation"],
    treatment: ["Symptomatic treatment", "Dietary modification"],
    labTests: ["Stool routine", "USG abdomen (if persistent)"],
    prescription: ["Syp. Dicyclomine 2.5ml SOS for pain", "Tab. Albendazole 400mg single dose"]
  },
  "Ear pain": {
    diagnosis: ["Acute otitis media", "Otitis externa", "Referred pain from throat"],
    treatment: ["Antibiotics course", "Symptomatic treatment"],
    labTests: ["No tests required usually"],
    prescription: ["Syp. Amoxicillin 5ml 1-1-1 x 5 days", "Syp. Meftal-P 5ml SOS for pain/fever", "Ear drops Otobiotic 3 drops BD x 5 days"]
  },
  "Sore throat": {
    diagnosis: ["Tonsillitis", "Pharyngitis", "Upper respiratory infection"],
    treatment: ["Antibiotics course", "Symptomatic treatment"],
    labTests: ["Throat swab (if recurrent)"],
    prescription: ["Syp. Amoxicillin 5ml 1-1-1 x 5 days", "Syp. Paracetamol 5ml SOS for fever"]
  },
  "Rash": {
    diagnosis: ["Viral exanthem", "Allergic reaction", "Hand foot mouth disease"],
    treatment: ["Topical treatment", "Symptomatic treatment"],
    labTests: ["CBC", "IgE levels (if allergic)"],
    prescription: ["Syp. Cetirizine 2.5ml 0-0-1 x 5 days", "Calamine lotion apply locally BD"]
  },
  "Loss of appetite": {
    diagnosis: ["Worm infestation", "Nutritional deficiency", "Underlying infection"],
    treatment: ["Symptomatic treatment", "Dietary modification"],
    labTests: ["CBC", "Stool routine", "Hemoglobin"],
    prescription: ["Tab. Albendazole 400mg single dose", "Syp. Aptimil (appetizer) 5ml 1-0-1 x 15 days"]
  },
  "Difficulty breathing": {
    diagnosis: ["Bronchitis", "Pneumonia", "Asthma/Wheeze"],
    treatment: ["Nebulization", "Antibiotics course"],
    labTests: ["CBC", "Chest X-ray", "Pulse oximetry"],
    prescription: ["Nebulization with Salbutamol + Budecort", "Syp. Amoxicillin 5ml 1-1-1 x 5 days"]
  },
  "Crying excessively": {
    diagnosis: ["Colic", "Ear infection", "Teething discomfort"],
    treatment: ["Symptomatic treatment"],
    labTests: ["Examination based tests"],
    prescription: ["Drops Colicaid 0.5ml SOS", "Syp. Paracetamol 2.5ml SOS"]
  },
  "Not feeding well": {
    diagnosis: ["Oral thrush", "Nasal congestion", "Underlying infection"],
    treatment: ["Symptomatic treatment", "Dietary modification"],
    labTests: ["CBC", "Check for oral thrush"],
    prescription: ["Drops Nasivion Paed 1 drop each nostril BD x 3 days", "Candid mouth paint apply BD x 5 days"]
  },
  "Weight loss": {
    diagnosis: ["Nutritional deficiency", "Worm infestation", "Growth monitoring"],
    treatment: ["Dietary modification", "Growth monitoring"],
    labTests: ["CBC", "Stool routine", "Thyroid profile"],
    prescription: ["Tab. Albendazole 400mg single dose", "Multivitamin syrup 5ml 1-0-0 x 30 days"]
  }
};

export const orthopedicOptions = {
  symptoms: Object.keys(orthopedicSymptomMappings),
  diagnosis: [
    "Osteoarthritis",
    "Rheumatoid arthritis",
    "Lumbar spondylosis",
    "Cervical spondylosis",
    "Fracture",
    "Ligament tear",
    "Meniscus tear",
    "Tendinitis",
    "Bursitis",
    "Sciatica",
    "Disc herniation",
    "Frozen shoulder",
    "Carpal tunnel syndrome",
    "Osteoporosis",
    "Gout",
    "Avascular necrosis",
    "Rotator cuff injury"
  ],
  treatment: [
    "Rest and ice therapy",
    "Physical therapy",
    "Pain management",
    "Joint immobilization",
    "Surgical intervention required",
    "Steroid injection",
    "Exercise therapy",
    "Weight management",
    "Bracing/Splinting",
    "Hot/Cold compress"
  ],
  labTests: [
    "X-ray of affected joint",
    "X-ray Lumbar spine AP/Lateral",
    "X-ray Cervical spine AP/Lateral",
    "X-ray Knee AP/Lateral",
    "X-ray Shoulder AP/Lateral",
    "X-ray Hip AP/Lateral",
    "MRI Lumbar spine",
    "MRI Cervical spine",
    "MRI Knee",
    "MRI Shoulder",
    "MRI Hip",
    "CT scan",
    "ESR",
    "CRP",
    "RA Factor",
    "Uric acid",
    "CBC",
    "Vitamin D levels",
    "Vitamin B12 levels",
    "CPK",
    "EMG/NCV",
    "HLA-B27",
    "Thyroid profile"
  ],
  prescription: [
    "Tab. Paracetamol 500mg 1-0-1 x 5 days",
    "Tab. Ibuprofen 400mg 1-0-1 x 5 days",
    "Tab. Diclofenac 50mg 1-0-1 x 7 days",
    "Tab. Calcium + Vit D3 1-0-0 x 30 days",
    "Tab. Aceclofenac 100mg 1-0-1 x 5 days",
    "Cap. Omeprazole 20mg 1-0-0 x 7 days",
    "Tab. Methycobal 500mcg 1-0-1 x 15 days",
    "Gel Diclofenac apply locally BD",
    "Tab. Etoricoxib 60mg 0-0-1 x 5 days",
    "Tab. Pregabalin 75mg 0-0-1 x 7 days",
    "Tab. Thiocolchicoside 4mg 1-0-1 x 5 days"
  ]
};

export const pediatricOptions = {
  symptoms: Object.keys(pediatricSymptomMappings),
  diagnosis: [
    "Viral fever",
    "Upper respiratory infection",
    "Acute gastroenteritis",
    "Acute otitis media",
    "Tonsillitis",
    "Bronchitis",
    "Pneumonia",
    "Allergic rhinitis",
    "Viral exanthem",
    "Hand foot mouth disease",
    "Chickenpox",
    "Measles",
    "Nutritional deficiency",
    "Growth monitoring",
    "Common cold",
    "Food poisoning",
    "Worm infestation",
    "Colic",
    "Oral thrush"
  ],
  treatment: [
    "Symptomatic treatment",
    "Hydration therapy",
    "Antipyretics",
    "Antibiotics course",
    "Nebulization",
    "ORS and zinc supplementation",
    "Topical treatment",
    "Dietary modification",
    "Immunization",
    "Follow-up after 3 days",
    "Growth monitoring",
    "Steam inhalation"
  ],
  labTests: [
    "CBC",
    "Urine routine",
    "Stool routine",
    "Stool culture",
    "Chest X-ray",
    "Malarial antigen",
    "Throat swab",
    "IgE levels",
    "Hemoglobin",
    "Thyroid profile",
    "USG abdomen",
    "Pulse oximetry"
  ],
  prescription: [
    "Syp. Paracetamol 5ml SOS for fever",
    "Syp. Cetirizine 2.5ml 0-0-1 x 5 days",
    "Syp. Amoxicillin 5ml 1-1-1 x 5 days",
    "Syp. Azithromycin 5ml 1-0-0 x 3 days",
    "Syp. Ondem 2ml SOS for vomiting",
    "ORS 1 packet in 1L water after each loose stool",
    "Syp. Zinc 5ml 1-0-0 x 14 days",
    "Syp. Calpol Plus 5ml SOS for fever",
    "Drops Nasivion 2 drops each nostril BD x 3 days",
    "Syp. Meftal-P 5ml SOS for pain/fever",
    "Tab. Albendazole 400mg single dose",
    "Syp. Ambroxol 2.5ml 1-1-1 x 5 days",
    "Calamine lotion apply locally BD",
    "Nebulization with Salbutamol + Budecort",
    "Multivitamin syrup 5ml 1-0-0 x 30 days"
  ]
};

export const getMedicalOptions = (doctorId: string) => {
  return doctorId === '1' ? orthopedicOptions : pediatricOptions;
};

export const getSymptomSuggestions = (doctorId: string, symptom: string): SymptomMapping | null => {
  const mappings = doctorId === '1' ? orthopedicSymptomMappings : pediatricSymptomMappings;
  return mappings[symptom] || null;
};
