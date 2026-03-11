from django.db.models.signals import post_save
from django.dispatch import receiver
from django.db.models import Count, Q
from . import selectors
from .models import LessonAttempt, Enrollment, Lesson

@receiver(post_save, sender=LessonAttempt)
def update_enrollment_progress(sender, instance, **kwargs):
    user = instance.user
    course = instance.lesson.section.course
    enrollment = selectors.get_enrollment(user, course)
    total_lessons = Lesson.objects.filter(section__course=course).count()
    completed_lessons = LessonAttempt.objects.filter(
        user=user,
        lesson__section__course=course,
        is_completed=True
    ).values('lesson').distinct().count()

    if total_lessons > 0:
        new_percentage = (completed_lessons / total_lessons) * 100
        enrollment.percentage_completed = round(new_percentage, 2)

        if enrollment.percentage_completed >= 100:
            enrollment.is_completed = True
        else:
            enrollment.is_completed = False

        enrollment.save()