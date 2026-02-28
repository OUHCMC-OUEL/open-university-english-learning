from rest_framework.exceptions import ValidationError, PermissionDenied
from . import selectors, managers

def enroll_user_in_course(user, course_id: int):
    course = selectors.get_course_by_id(course_id)
    
    if selectors.check_user_enrolled(user, course):
        raise ValidationError("Bạn đã đăng ký khóa học này rồi.")
        
    return managers.CourseManager.create_enrollment(user, course)

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