from django.db.models import QuerySet
from rest_framework.exceptions import NotFound
from .models import Course, Enrollment, ForumPost, Reply, Lesson

def get_available_courses() -> QuerySet[Course]:
    # Lấy danh sách khóa học (Có thể mở rộng filter theo is_active nếu sau này models có thêm)
    return Course.objects.select_related('subject').all()

def get_course_by_id(course_id: int) -> Course:
    try:
        return Course.objects.get(id=course_id)
    except Course.DoesNotExist:
        raise NotFound("Không tìm thấy khóa học này.")

def check_user_enrolled(user, course) -> bool:
    return Enrollment.objects.filter(user=user, course=course).exists()

def get_post_by_id(post_id: int) -> ForumPost:
    try:
        return ForumPost.objects.get(id=post_id)
    except ForumPost.DoesNotExist:
        raise NotFound("Bài viết không tồn tại.")

def get_reply_by_id(reply_id: int) -> Reply:
    try:
        return Reply.objects.get(id=reply_id)
    except Reply.DoesNotExist:
        raise NotFound("Bình luận không tồn tại.")

def get_lesson_by_id(lesson_id: int) -> Lesson:
    try:
        return Lesson.objects.get(id=lesson_id)
    except Lesson.DoesNotExist:
        raise NotFound("Bài học không tồn tại.")