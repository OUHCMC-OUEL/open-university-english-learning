from django.db import transaction
from .models import Enrollment, ForumPost, Reply, CommentInteraction, LikeInteraction, LessonAttempt


class CourseManager:
    @staticmethod
    def create_enrollment(user, course):
        return Enrollment.objects.create(user=user, course=course)

class LessonManager:
    @staticmethod
    def create_lesson_attempt(user, lesson, is_completed=False, score=None):
        attempt, created = LessonAttempt.objects.update_or_create(
            user=user,
            lesson=lesson,
            defaults={
                'is_completed': is_completed,
                'score': score,
                'is_passed': (score >= 5 if score is not None else is_completed)
            }
        )
        return attempt
class ForumManager:
    @staticmethod
    def create_post(user, forum_id, name, content):
        return ForumPost.objects.create(user=user, forum_id=forum_id, name=name, content=content)
    
    @staticmethod
    def update_post(post, name, content):
        post.name = name
        post.content = content
        post.save()
        return post

    @staticmethod
    def delete_post(post):
        post.delete()

    @staticmethod
    def create_reply(user, post_id, name, content):
        return Reply.objects.create(user=user, post_id=post_id, name=name, content=content)

    @staticmethod
    def update_reply(reply, name, content):
        reply.name = name
        reply.content = content
        reply.save()
        return reply

    @staticmethod
    def delete_reply(reply):
        reply.delete()

class InteractionManager:
    @staticmethod
    def create_comment(user, course, lesson, comment_text):
        return CommentInteraction.objects.create(
            user=user, course=course, lesson=lesson, comment=comment_text
        )

    @staticmethod
    @transaction.atomic
    def toggle_like(user, course, lesson):
        like, created = LikeInteraction.objects.get_or_create(
            user=user, course=course, lesson=lesson
        )
        if not created:
            like.delete()
            return False 
        return True 