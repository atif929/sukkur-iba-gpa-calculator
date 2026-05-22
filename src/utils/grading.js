// ─── Sukkur IBA Grading Policy ────────────────────────────────────────────────

export const GRADE_TABLE = [
  { grade: "A",  gp: 4.00, min: 93, max: 100 },
  { grade: "A-", gp: 3.67, min: 87, max: 92  },
  { grade: "B+", gp: 3.33, min: 82, max: 86  },
  { grade: "B",  gp: 3.00, min: 77, max: 81  },
  { grade: "B-", gp: 2.67, min: 72, max: 76  },
  { grade: "C+", gp: 2.30, min: 68, max: 71  },
  { grade: "C",  gp: 2.00, min: 64, max: 67  },
  { grade: "C-", gp: 1.67, min: 60, max: 63  },
  { grade: "F",  gp: 0.00, min: 0,  max: 59  },
];

// AFTER
export function marksToGrade(marks) {
  const m = parseFloat(marks);
  if (isNaN(m) || m < 0 || m > 100) return null;
  const rounded = Math.round(m);          // 76.5→77, 75.5→76, 67.75→68, 82.25→82
  const entry = GRADE_TABLE.find(g => rounded >= g.min && rounded <= g.max);
  return entry ?? GRADE_TABLE[GRADE_TABLE.length - 1];
}

// Convert grade letter → gp
export function gradeLetterToGP(grade) {
  const entry = GRADE_TABLE.find(g => g.grade === grade);
  return entry ? entry.gp : null;
}

// ─── GPA Calculation ──────────────────────────────────────────────────────────
// courses: [{ creditHours, marks, grade, isNonCredit }]
export function calculateGPA(courses) {
  // removed unused variable => const creditCourses = courses.filter(c => !c.isNonCredit);
  let totalWeightedPoints = 0;
  let totalCreditHours = 0;
  let totalMarks = 0;
  let totalPossibleMarks = 0;
  let failedCourses = 0;

  const processed = courses.map(course => {
    const ch = parseFloat(course.creditHours) || 0;
    let gp = 0;
    let gradeObj = null;

    if (course.marks !== "" && course.marks !== undefined) {
      gradeObj = marksToGrade(course.marks);
    } else if (course.grade) {
      gp = gradeLetterToGP(course.grade) ?? 0;
      gradeObj = GRADE_TABLE.find(g => g.grade === course.grade);
    }

    if (gradeObj) gp = gradeObj.gp;

    const weightedPoints = gp * ch;

    if (!course.isNonCredit) {
      totalWeightedPoints += weightedPoints;
      totalCreditHours += ch;
      if (course.marks !== "" && course.marks !== undefined) {
        totalMarks += parseFloat(course.marks) || 0;
        totalPossibleMarks += 100;
      }
      if (gp === 0) failedCourses++;
    }

    return {
      ...course,
      resolvedGrade: gradeObj?.grade ?? "—",
      resolvedGP: gp,
      weightedPoints,
      creditHours: ch,
    };
  });

  const gpa = totalCreditHours > 0 ? totalWeightedPoints / totalCreditHours : 0;
  const percentage = totalPossibleMarks > 0 ? (totalMarks / totalPossibleMarks) * 100 : null;

  return {
    gpa: parseFloat(gpa.toFixed(2)),
    percentage: percentage !== null ? parseFloat(percentage.toFixed(2)) : null,
    totalCreditHours,
    totalWeightedPoints: parseFloat(totalWeightedPoints.toFixed(2)),
    failedCourses,
    processedCourses: processed,
  };
}

// ─── CGPA Calculation ─────────────────────────────────────────────────────────
// semesters: [{ gpa, creditHours }]
export function calculateCGPA(semesters) {
  let totalWeighted = 0;
  let totalCredits = 0;

  semesters.forEach(s => {
    const gpa = parseFloat(s.gpa) || 0;
    const ch  = parseFloat(s.creditHours) || 0;
    totalWeighted += gpa * ch;
    totalCredits  += ch;
  });

  const cgpa = totalCredits > 0 ? totalWeighted / totalCredits : 0;
  return {
    cgpa: parseFloat(cgpa.toFixed(2)),
    totalCredits,
    totalWeighted: parseFloat(totalWeighted.toFixed(2)),
  };
}

// ─── Academic Standing ────────────────────────────────────────────────────────
export function getAcademicStanding(gpa) {
  if (gpa >= 3.5)  return { label: "Dean's List",      color: "emerald", emoji: "🏆" };
  if (gpa >= 3.0)  return { label: "Good Standing",    color: "green",   emoji: "✅" };
  if (gpa >= 2.5)  return { label: "Satisfactory",     color: "blue",    emoji: "👍" };
  if (gpa >= 2.0)  return { label: "Warning",          color: "yellow",  emoji: "⚠️" };
  return           { label: "Academic Probation",      color: "red",     emoji: "🚨" };
}

// ─── Validation ───────────────────────────────────────────────────────────────
export function validateCourse(course) {
  const errors = {};
  if (!course.name?.trim()) errors.name = "Course name is required.";
  const ch = parseFloat(course.creditHours);
  if (isNaN(ch) || ch <= 0) errors.creditHours = "Credit hours must be a positive number.";
  if (course.inputType === "marks") {
    const m = parseFloat(course.marks);
    if (isNaN(m) || m < 0 || m > 100) errors.marks = "Marks must be between 0 and 100.";
  } else {
    if (!course.grade) errors.grade = "Please select a grade.";
  }
  return errors;
}
