from rest_framework.exceptions import ValidationError, PermissionDenied
from . import selectors, managers

def enroll_user_in_course(user, course_id: int):
    course = selectors.get_course_by_id(course_id)
    
    if selectors.check_user_enrolled(user, course):
        raise ValidationError("Bạn đã đăng ký khóa học này rồi.")
    return managers.CourseManager.create_enrollment(user, course)

def attempt_lesson_service(user, lesson_id: int, data: dict = None):
    data = data or {}
    lesson = selectors.get_lesson_by_id(lesson_id)

    course = lesson.section.course
    is_enrolled = selectors.check_user_enrolled(user, course)
    if not is_enrolled:
        raise PermissionDenied("Bạn chưa đăng ký khóa học này nên không thể thực hiện bài học.")

    is_completed = False
    score = data.get('score', 0)
    time_spent = data.get('time_spent', 0)

    if hasattr(lesson, 'theorylesson'):
        theory = lesson.theorylesson
        if time_spent >= theory.minimum_time:
            is_completed = True
        else:
            raise ValidationError(f"Bạn cần học ít nhất {theory.minimum_time} giây để hoàn thành.")

    elif hasattr(lesson, 'assignmentlesson'):
        assignment = lesson.assignmentlesson
        if score >= 5:
            is_completed = True
        else:
            is_completed = False

    attempt = managers.LessonManager.create_lesson_attempt(
        user=user,
        lesson=lesson,
        is_completed=is_completed,
        score=score
    )
    return attempt

def get_user_enrollments_map(user, course_ids) -> dict:
    if not user or not user.is_authenticated:
        return {}

    enrollments = selectors.get_enrollment_by_user(user).filter(course_id__in=course_ids)
    return {e.course_id: e for e in enrollments}

def manage_forum_post(action: str, user, data: dict, post_id: int = None):
    if action == 'create':
        course = selectors.get_course_by_id(data.get('course_id'))
        if not selectors.check_user_enrolled(user, course):
            raise PermissionDenied("Bạn phải đăng ký khóa học mới được tham gia diễn đàn.")
        return managers.ForumManager.create_post(
            user=user, forum_id=data['forum_id'], name=data['name'], content=data['content']
        )

    post = selectors.get_post_by_id(post_id)
    if post.user != user:
        raise PermissionDenied("Bạn không có quyền chỉnh sửa/xóa bài viết của người khác.")
        
    if action == 'update':
        return managers.ForumManager.update_post(post, data.get('name', post.name), data.get('content', post.content))
    elif action == 'delete':
        managers.ForumManager.delete_post(post)

def manage_reply(action: str, user, data: dict, reply_id: int = None):
    if action == 'create':
        return managers.ForumManager.create_reply(
            user=user, post_id=data['post_id'], name=data['name'], content=data['content']
        )
    
    reply = selectors.get_reply_by_id(reply_id)
    if reply.user != user:
        raise PermissionDenied("Bạn không có quyền can thiệp bình luận này.")
        
    if action == 'update':
        return managers.ForumManager.update_reply(reply, data.get('name', reply.name), data.get('content', reply.content))
    elif action == 'delete':
        managers.ForumManager.delete_reply(reply)

def interact_with_lesson(user, course_id: int, lesson_id: int, interaction_type: str, comment_text: str = None):
    course = selectors.get_course_by_id(course_id)
    lesson = selectors.get_lesson_by_id(lesson_id)
    
    if not selectors.check_user_enrolled(user, course):
        raise PermissionDenied("Bạn phải đăng ký khóa học mới được tương tác.")

    if interaction_type == 'comment':
        if not comment_text:
            raise ValidationError("Nội dung bình luận không được để trống.")
        return managers.InteractionManager.create_comment(user, course, lesson, comment_text)
    
    elif interaction_type == 'like':
        return managers.InteractionManager.toggle_like(user, course, lesson)