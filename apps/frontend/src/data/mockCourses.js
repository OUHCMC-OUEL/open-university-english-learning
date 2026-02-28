export const mockCourses = [
  {
    id: 1,
    name: "Giao tiếp Cơ bản - Level 1",
    level: "beginner",
    subject_name: "Tiếng Anh Giao Tiếp",
    description: "Khóa học giúp bạn tự tin chào hỏi và giới thiệu bản thân với người nước ngoài.",
    image: "https://res.cloudinary.com/dfz0dhsil/image/upload/v1770940161/image_1_q6gxe8.png",
    students_count: 1240,
    sections: [
      {
        id: 1,
        title: "Chương 1: Chào hỏi cơ bản",
        lessons: [
          { id: 1, title: "Lý thuyết: Động từ To-be", type: "theory", duration: 15, is_completed: true },
          { id: 2, title: "Bài tập: Chia động từ", type: "assignment", score: 100, is_completed: false }
        ]
      }
    ]
  },
  {
    id: 2,
    name: "IELTS Reading Mastery",
    level: "advanced",
    subject_name: "Luyện thi IELTS",
    description: "Làm chủ kỹ năng Skimming và Scanning trong văn bản học thuật.",
    image: "https://res.cloudinary.com/dfz0dhsil/image/upload/v1771504584/Screenshot_2026-02-19_at_19.35.49_hkqivq.png",
    students_count: 856,
    sections: []
  }
];

export const mockEnrollments = [
  {
    id: 1,
    course: mockCourses[0], 
    percentage_completed: 50.0,
    is_completed: false,
  }
];