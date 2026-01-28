
import { TutorProfile, JobPost } from './types';

export const MOCK_TUTORS: TutorProfile[] = [
  {
    id: 't1',
    userId: 'u1',
    name: 'Nguyễn Văn A',
    subjects: ['Toán', 'Lý'],
    hourlyRate: 200000,
    experience: '5 năm kinh nghiệm dạy kèm ôn thi Đại học',
    rating: 4.9,
    bio: 'Nhiệt tình, phương pháp dạy trực quan, giúp học sinh mất gốc lấy lại căn bản nhanh chóng.',
    location: 'Quận 1, TP.HCM',
    avatar: 'https://picsum.photos/seed/tutor1/200'
  },
  {
    id: 't2',
    userId: 'u2',
    name: 'Trần Thị B',
    subjects: ['Tiếng Anh', 'IELTS'],
    hourlyRate: 350000,
    experience: 'IELTS 8.5, 3 năm giảng dạy tại trung tâm lớn',
    rating: 4.8,
    bio: 'Chuyên luyện thi IELTS và giao tiếp. Cam kết đầu ra cho học viên.',
    location: 'Quận Cầu Giấy, Hà Nội',
    avatar: 'https://picsum.photos/seed/tutor2/200'
  },
  {
    id: 't3',
    userId: 'u3',
    name: 'Lê Văn C',
    subjects: ['Hóa học', 'Sinh học'],
    hourlyRate: 150000,
    experience: 'Sinh viên năm 4 ĐH Sư Phạm',
    rating: 4.7,
    bio: 'Tận tâm, kiên nhẫn với các bé tiểu học và trung học.',
    location: 'Quận Hải Châu, Đà Nẵng',
    avatar: 'https://picsum.photos/seed/tutor3/200'
  }
];

export const MOCK_JOBS: JobPost[] = [
  {
    id: 'j1',
    parentId: 'p1',
    parentName: 'Chị Lan',
    subject: 'Toán lớp 9',
    grade: 'Lớp 9',
    budget: 250000,
    description: 'Cần tìm gia sư dạy kèm ôn thi vào lớp 10, tuần 3 buổi.',
    location: 'Quận Bình Thạnh, TP.HCM',
    createdAt: '2024-03-20'
  },
  {
    id: 'j2',
    parentId: 'p2',
    parentName: 'Anh Hùng',
    subject: 'Tiếng Anh Giao Tiếp',
    grade: 'Người đi làm',
    budget: 400000,
    description: 'Dạy giao tiếp cơ bản cho người mới bắt đầu, thời gian linh hoạt.',
    location: 'Quận Hoàn Kiếm, Hà Nội',
    createdAt: '2024-03-18'
  }
];
