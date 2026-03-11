from django.db.models import QuerySet, Count, Q, OuterRef, Exists
from rest_framework.exceptions import NotFound
from .models import Course, Enrollment, ForumPost, Reply, Lesson, Subject

def get_available_courses(user=None, filters=None) -> QuerySet[Course]:
    filters = filters or {}

    query = Course.objects.select_related('subject').annotate(
        student_count=Count('enrollments', distinct=True)
    )

    is_enrolled_raw = filters.get('is_enrolled')
    if is_enrolled_raw is not None:
        is_enrolled = str(is_enrolled_raw).strip('/').lower()=='true'
        if not (user and user.is_authenticated):
            return Course.objects.none() if is_enrolled else query

        enrollment_subquery = Enrollment.objects.filter(
            course=OuterRef('pk'), user=user
        )
        query = query.annotate(is_enrolled=Exists(enrollment_subquery))

        if is_enrolled:
            query = query.filter(is_enrolled=True)
        else:
            query = query.filter(is_enrolled=False)

    q = filters.get('q')
    level = filters.get('level')
    subject_id = filters.get('subject_id')

    if q:
        query = query.filter(name__icontains=q)

    if level:
        query = query.filter(level=level)

    if subject_id:
        try:
            query = query.filter(subject_id=int(subject_id))
        except (ValueError, TypeError):
            pass

    return query.order_by('-id')

def get_course_by_id(course_id: int) -> Course:
    try:
        return Course.objects.select_related('subject').prefetch_related('sections') \
            .prefetch_related('sections__lessons', 'sections__lessons__theorylesson','sections__lessons__assignmentlesson')\
            .annotate(student_count=Count('enrollments', distinct=True)).get(id=course_id)
    except Course.DoesNotExist:
        raise NotFound("Không tìm thấy khóa học này.")

def get_list_subject() -> QuerySet[Subject]:
    return Subject.objects.all()

def get_enrollment_by_id(enrollment_id: int, ) -> Enrollment:
    try:
        return Enrollment.objects.get(id=enrollment_id)
    except Enrollment.DoesNotExist:
        raise NotFound("Bạn chưa đăng ký khoá học này.")

def get_enrollment(user, course) -> Enrollment:
    try:
        return Enrollment.objects.get(user=user, course=course)
    except Enrollment.DoesNotExist:
        raise NotFound("Bạn chưa đăng ký khoá học này.")

def get_enrollment_by_user(user):
    return Enrollment.objects.filter(user=user).select_related('course').annotate(
        total_lessons=Count('course__sections__lessons', distinct=True),

        completed_lessons=Count(
            'course__sections__lessons__attempts',
            filter=Q(course__sections__lessons__attempts__user=user,
                     course__sections__lessons__attempts__is_completed=True),
            distinct=True
        )
    )

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